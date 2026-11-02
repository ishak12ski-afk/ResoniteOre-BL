// Heavy resonance crescent using the original ExampleMod energy sword projectile sheet.
// The original 4 frames are trimmed only to remove transparent margins.
// Uses a separate projectile type so normal ResoniteWave is left untouched.
const { Main, Utils } = Terraria;
const { TextureAssets } = Terraria.GameContent;
const { SpriteEffects } = Microsoft.Xna.Framework.Graphics;
const Frame = Utils['Rectangle Frame(Texture2D tex, int horizontalFrames, int verticalFrames, int frameX, int frameY, int sizeOffsetX, int sizeOffsetY)'];

export class ResoniteBurst extends ModProjectile {
    SetStaticDefaults() { Main.projFrames[this.Type] = 4; }

    SetDefaults(proj) {
        proj.width = 108;
        proj.height = 140;
        proj.friendly = true;
        proj.hostile = false;
        proj.DamageType = DamageClass.Melee;
        proj.penetrate = 3;
        proj.tileCollide = false;
        proj.ignoreWater = true;
        proj.aiStyle = -1;
        proj.timeLeft = 60;
        proj.alpha = 0;
        proj.scale = 1.55; // Source sprite is 170px per frame; already very large.
        proj.light = 0.65;
        proj.usesLocalNPCImmunity = true;
        proj.localNPCHitCooldown = 18;
    }

    OnSpawn(proj) {
        proj.rotation = Math.atan2(proj.velocity.Y, proj.velocity.X);
    }

    AI(proj) {
        proj.frameCounter++;
        if (proj.frameCounter >= 5) {
            proj.frameCounter = 0;
            proj.frame = (proj.frame + 1) % 4;
        }
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
        proj.scale = Math.max(1.35, proj.scale * 0.995);
    }

    CanDamage(proj) {
        return proj.timeLeft > 18;
    }

    PreDraw(proj, lightColor) {
        const texture = TextureAssets.Projectile[this.Type].Value;
        const source = Frame(texture, 1, 4, 0, proj.frame, 0, 0);
        // Each 62 x 148 cropped ExampleMod frame has its crescent near
        // its center; keep the grip/collision anchor aligned.
        const origin = Vector2.new(31, 74);
        Main.spriteBatch['void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)'](
            texture,
            Vector2.Subtract(proj.Center, Main.screenPosition),
            source,
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
