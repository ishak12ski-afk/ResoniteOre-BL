// Bunny Loader API v2.
// +20% movement speed; a short horizontal dash only after TWO taps
// of the SAME direction (left or right) within the tap window.
export class ResoniteMovementPlayer extends ModPlayer {
    constructor() {
        super();
        this.ResetDashState();
    }

    static DashVelocity = 7.8;
    static DashDuration = 8;
    static DashCooldown = 35;
    // 25 game ticks ~= 0.42 seconds at 60 TPS: comfortable for touch controls.
    static DoubleTapWindow = 25;

    ResetDashState() {
        this.wasRightHeld = false;
        this.wasLeftHeld = false;
        this.rightTapTimer = 0;
        this.leftTapTimer = 0;
        this.dashCooldown = 0;
        this.dashTicks = 0;
        this.dashDirection = 0;
        this.dashEnding = false;
        this.preDashSpeed = 0;
    }

    OnEnterWorld(player) {
        this.ResetDashState();
    }

    OnRespawn(player) {
        this.ResetDashState();
    }

    UpdateEquips(player) {
        if (!player.dead && !player.mount.Active) {
            player.moveSpeed += 0.20;
        }
    }

    UpdateMovement(player) {
        if (player.whoAmI !== Terraria.Main.myPlayer) return;
        if (player.dead) {
            this.ResetDashState();
            return;
        }

        // The transition released -> pressed is one tap. Simply holding
        // a direction doesn't count as multiple taps.
        const rightHeld = !!player.controlRight;
        const leftHeld = !!player.controlLeft;
        const rightPressed = rightHeld && !this.wasRightHeld;
        const leftPressed = leftHeld && !this.wasLeftHeld;
        this.wasRightHeld = rightHeld;
        this.wasLeftHeld = leftHeld;

        // One timer per direction. Pressing the opposite direction cancels
        // the pending first tap, so left -> right never triggers a dash.
        if (this.rightTapTimer > 0) this.rightTapTimer--;
        if (this.leftTapTimer > 0) this.leftTapTimer--;
        if (this.dashCooldown > 0) {
            this.dashCooldown--;
            this.rightTapTimer = 0;
            this.leftTapTimer = 0;
        }

        // Do not interfere with vanilla dashes or mounts.
        if (player.dashType !== Terraria.ID.DashID.None || player.setSolar || player.mount.Active) {
            this.rightTapTimer = 0;
            this.leftTapTimer = 0;
            this.dashTicks = 0;
            this.dashDirection = 0;
            this.dashEnding = false;
            return;
        }

        // At the end of the burst, smoothly return to the player's real
        // movement cap without erasing faster buffs or knockback.
        if (this.dashEnding) {
            this.dashEnding = false;
            const v = player.velocity;
            const runCap = Math.max(3.5, player.accRunSpeed, player.maxRunSpeed);
            const normalSpeed = Math.max(runCap, this.preDashSpeed);
            if (v.X * this.dashDirection > 0 &&
                Math.abs(v.X) > normalSpeed &&
                Math.abs(v.X) <= ResoniteMovementPlayer.DashVelocity + 0.5) {
                v.X = this.dashDirection * normalSpeed;
                player.velocity = v;
            }
            this.dashDirection = 0;
        }

        // Ignore simultaneous opposite directions.
        const dir = rightPressed && !leftHeld ? 1 :
                    leftPressed && !rightHeld ? -1 : 0;
        if (dir !== 0) {
            player.direction = dir;

            // Changing direction while dashing interrupts the current dash.
            if (this.dashTicks > 0 && dir !== this.dashDirection) {
                this.dashTicks = 0;
                this.dashEnding = false;
                this.dashDirection = 0;
            }

            // Only register a double tap when not cooling down or dashing.
            if (this.dashCooldown === 0 && this.dashTicks === 0) {
                const secondTap = dir === 1
                    ? this.rightTapTimer > 0
                    : this.leftTapTimer > 0;

                // A second tap of the same direction completes the sequence.
                // The first tap only starts a timer; normal walking is unchanged.
                this.rightTapTimer = dir === 1 && !secondTap
                    ? ResoniteMovementPlayer.DoubleTapWindow : 0;
                this.leftTapTimer = dir === -1 && !secondTap
                    ? ResoniteMovementPlayer.DoubleTapWindow : 0;

                if (secondTap) {
                    this.dashDirection = dir;
                    this.preDashSpeed = Math.abs(player.velocity.X);
                    this.dashTicks = ResoniteMovementPlayer.DashDuration;
                    this.dashCooldown = ResoniteMovementPlayer.DashCooldown;
                }
            } else {
                this.rightTapTimer = 0;
                this.leftTapTimer = 0;
            }
        }

        if (this.dashTicks > 0) {
            const v = player.velocity;
            if (v.X * this.dashDirection < ResoniteMovementPlayer.DashVelocity) {
                v.X = this.dashDirection * ResoniteMovementPlayer.DashVelocity;
                player.velocity = v;
            }
            this.dashTicks--;
            if (this.dashTicks === 0) this.dashEnding = true;
        }
    }
}
