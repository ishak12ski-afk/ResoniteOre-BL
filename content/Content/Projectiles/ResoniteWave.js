// Bunny Loader API v2; flies, slows down, then fades.

export class ResoniteWave extends ModProjectile {
    SetDefaults() {
        this.Projectile.width = 28;
        this.Projectile.height = 12;
        this.Projectile.friendly = true;
        this.Projectile.melee = true;
        this.Projectile.hostile = false;
        this.Projectile.penetrate = 2;
        this.Projectile.tileCollide = false;
        this.Projectile.ignoreWater = true;
        this.Projectile.timeLeft = 70;
        this.Projectile.alpha = 0;
        this.Projectile.scale = 1.0;
        this.Projectile.light = 0.35;
        this.Projectile.aiStyle = 0;
    }

    OnSpawn(proj) {
        const speedSq = proj.velocity.X * proj.velocity.X + proj.velocity.Y * proj.velocity.Y;
        if (speedSq > 0.0001) {
            proj.rotation = Math.atan2(proj.velocity.Y, proj.velocity.X);
        }
    }

    AI(proj) {
        // First phase: fly straight in the original cursor direction.
        if (proj.timeLeft > 38) {
            const speedSq = proj.velocity.X * proj.velocity.X + proj.velocity.Y * proj.velocity.Y;
            if (speedSq > 0.0001) {
                proj.rotation = Math.atan2(proj.velocity.Y, proj.velocity.X);
            }
            return;
        }

        // Second phase: smoothly brake almost to a full stop.
        if (proj.timeLeft > 24) {
            proj.velocity.X *= 0.72;
            proj.velocity.Y *= 0.72;

            if (Math.abs(proj.velocity.X) < 0.08) proj.velocity.X = 0;
            if (Math.abs(proj.velocity.Y) < 0.08) proj.velocity.Y = 0;
            return;
        }

        // Final phase: remain suspended and fade away.
        proj.velocity.X = 0;
        proj.velocity.Y = 0;
        proj.alpha = Math.min(255, proj.alpha + 11);
        proj.scale = Math.max(0.78, proj.scale * 0.992);
    }

    CanDamage(proj) {
        // Once the projectile has stopped and started fading, it is only visual.
        return proj.timeLeft > 24;
    }
}
