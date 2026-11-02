// Heavy resonance blast released by the third sword attack.
// Uses a separate projectile type so normal ResoniteWave is left untouched.
export class ResoniteBurst extends ModProjectile {
    SetDefaults(proj) {
        proj.width = 92;
        proj.height = 48;
        proj.friendly = true;
        proj.hostile = false;
        proj.DamageType = DamageClass.Melee;
        proj.penetrate = 3;
        proj.tileCollide = false;
        proj.ignoreWater = true;
        proj.aiStyle = -1;
        proj.timeLeft = 60;
        proj.alpha = 0;
        proj.scale = 3;
        proj.light = 0.65;
        proj.usesLocalNPCImmunity = true;
        proj.localNPCHitCooldown = 18;
    }

    OnSpawn(proj) {
        proj.rotation = Math.atan2(proj.velocity.Y, proj.velocity.X);
    }

    AI(proj) {
        if (proj.timeLeft > 32) {
            proj.rotation = Math.atan2(proj.velocity.Y, proj.velocity.X);
            return;
        }
        if (proj.timeLeft > 18) {
            proj.velocity.X *= 0.83;
            proj.velocity.Y *= 0.83;
            return;
        }
        proj.velocity.X *= 0.55;
        proj.velocity.Y *= 0.55;
        proj.alpha = Math.min(255, proj.alpha + 15);
        proj.scale = Math.max(2.2, proj.scale * 0.985);
    }

    CanDamage(proj) {
        return proj.timeLeft > 18;
    }
}
