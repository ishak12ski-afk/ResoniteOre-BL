// The sword itself becomes a held melee projectile, so these motions replace
// Terraria's stock swing instead of merely adjusting the item rotation.
const { Main } = Terraria;
const { TextureAssets } = Terraria.GameContent;
const { SpriteEffects } = Microsoft.Xna.Framework.Graphics;
const LineHits = Terraria.Collision['bool CheckAABBvLineCollision(Vector2 objectPosition, Vector2 objectDimensions, Vector2 lineStart, Vector2 lineEnd, float lineWidth, ref float collisionPoint)'];
const NewProjectile = Terraria.Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2, NewProjectileModifier modifer)'];

const clamp01 = v => Math.max(0, Math.min(1, v));
const smooth = v => { const x = clamp01(v); return x * x * (3 - 2 * x); };
const fastOut = v => { const x = clamp01(v); return 1 - (1 - x) * (1 - x) * (1 - x); };

export class ResoniteSlash extends ModProjectile {
    SetDefaults(proj) {
        proj.width = 28;
        proj.height = 28;
        proj.aiStyle = -1;
        proj.friendly = true;
        proj.hostile = false;
        proj.DamageType = DamageClass.Melee;
        proj.penetrate = -1;
        proj.tileCollide = false;
        proj.ignoreWater = true;
        proj.ownerHitCheck = true;
        proj.usesLocalNPCImmunity = true;
        proj.localNPCHitCooldown = -1;
        proj.usesOwnerMeleeHitCD = true;
        proj.timeLeft = 90;
    }

    ShouldUpdatePosition(proj) { return false; }

    AI(proj) {
        const player = Main.player[proj.owner];
        if (!player || !player.active || player.dead) { proj.Kill(); return; }

        const local = new ProjAI(proj, true);
        const stage = Math.round(proj.ai[0]);
        const duration = Math.max(18, proj.ai[1]);
        const tick = ++local[0];
        const t = clamp01(tick / duration);
        if (tick > duration || player.HeldItem.type !== ModItem.getTypeByName('ResoniteSword')) {
            proj.Kill();
            return;
        }

        player.heldProj = proj.whoAmI;
        const facing = proj.ai[2] >= 0 ? 1 : -1;
        let angle;
        let reach;

        if (stage === 0) {
            // Fast forward stab, tiny pause, then pull back.
            angle = -0.17 + 0.10 * smooth(t);
            reach = 9 + 52 * fastOut(t / 0.26) - 24 * smooth((t - 0.35) / 0.30);
        } else if (stage === 1) {
            // A rapid low-to-high cut.
            angle = 1.34 - 2.63 * smooth((t - 0.08) / 0.48);
            reach = 30 + 8 * Math.sin(Math.PI * t);
        } else {
            // Slow, conspicuous pullback followed by an explosive finishing arc.
            angle = t < 0.45
                ? -0.55 - 1.58 * smooth(t / 0.45)
                : -2.13 + 3.63 * fastOut((t - 0.45) / 0.23);
            reach = t < 0.45 ? 17 + 10 * smooth(t / 0.45) : 35 + 8 * Math.sin(Math.PI * t);
        }

        // Translate mirrored angles to actual world space, including gravity flip.
        const worldAngle = facing > 0 ? angle * player.gravDir : Math.PI - angle * player.gravDir;
        const axis = Vector2.new(Math.cos(worldAngle), Math.sin(worldAngle));
        const hand = player['Vector2 RotatedRelativePoint(Vector2 pos, bool reverseRotation, bool addGfxOffY, int pushFromOriginHack)'](player.MountedCenter, false, true, 0);
        proj.velocity = axis; // Stored for the custom line-shaped collision.
        proj.Center = Vector2.Add(hand, Vector2.Multiply(axis, reach * 0.52));
        proj.rotation = worldAngle + Math.PI / 4; // The sprite points diagonally up-right.
        proj.scale = stage === 2 ? 1.22 : 1;

        // One large projectile exactly once, at the impact of the final blow.
        if (stage === 2 && t >= 0.54 && local[1] === 0) {
            local[1] = 1;
            if (proj.owner === Main.myPlayer) {
                const burstType = ModProjectile.getTypeByName('ResoniteBurst');
                if (burstType != null) {
                    const aim = Vector2.SafeNormalize(
                        Vector2.Subtract(Main.MouseWorld, player.Center),
                        Vector2.new(player.direction, 0)
                    );
                    NewProjectile(
                        player.GetProjectileSource_Item(player.HeldItem),
                        Vector2.Add(player.Center, Vector2.Multiply(aim, 48)),
                        Vector2.Multiply(aim, 15),
                        burstType,
                        Math.max(1, Math.floor(proj.damage * 1.55)),
                        proj.knockBack * 1.4,
                        proj.owner,
                        0, 0, 0, null
                    );
                }
            }
        }
    }

    CanDamage(proj) {
        const stage = Math.round(proj.ai[0]);
        const time = new ProjAI(proj, true)[0] / Math.max(18, proj.ai[1]);
        if (stage === 0) return time >= 0.06 && time <= 0.43;
        if (stage === 1) return time >= 0.12 && time <= 0.68;
        return time >= 0.49 && time <= 0.79; // Windup itself cannot hit.
    }

    Colliding(proj, projHitbox, targetHitbox) {
        if (!this.CanDamage(proj)) return false;
        const start = Vector2.Subtract(proj.Center, Vector2.Multiply(proj.velocity, 12));
        const end = Vector2.Add(proj.Center, Vector2.Multiply(proj.velocity, 37 * proj.scale));
        const thickness = Math.round(13 * proj.scale);
        return LineHits(
            Vector2.new(targetHitbox.X, targetHitbox.Y),
            Vector2.new(targetHitbox.Width, targetHitbox.Height),
            start, end, thickness, new Ref(0)
        );
    }

    PreDraw(proj, lightColor) {
        const texture = TextureAssets.Projectile[this.Type].Value;
        const origin = Vector2.new(texture.Width / 2, texture.Height / 2);
        Main.spriteBatch['void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'](
            texture,
            Vector2.Subtract(proj.Center, Main.screenPosition),
            null,
            proj['Color GetAlpha(Color newColor)'](lightColor),
            proj.rotation,
            origin,
            proj.scale,
            SpriteEffects.None,
            0
        );
        return false;
    }
}
