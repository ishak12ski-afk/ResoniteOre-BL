// Bunny Loader API v2; every second sword swing fires ResoniteWave.

const NewProjectile = Terraria.Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2, NewProjectileModifier modifer)'];

export class ResoniteSword extends ModItem {
    SetDefaults() {
        this.Item.melee = true;
        this.SetWeaponValues(22, 5.5, 4);
        this.SetDefaultWeaponStyle(20, true);
        this.Item.value = Terraria.Item.sellPrice(0, 0, 45, 0);
        this.Item.rare = Terraria.ID.ItemRarityID.Green;
        this.Item.UseSound = Terraria.ID.SoundID.Item1;
    }

    UseItem(item, player) {
        // TL Pro calls UseItem repeatedly during an animation. Count only the first tick of each swing.
        if (player.itemAnimation !== player.itemAnimationMax) return true;

        const owner = player.whoAmI;
        this.swingCounts ??= {};
        this.swingCounts[owner] = (this.swingCounts[owner] ?? 0) + 1;

        // Shoot exactly once every two sword swings.
        if ((this.swingCounts[owner] % 2) !== 0) return true;

        // Only the local player creates the projectile, avoiding duplicate spawns.
        if (owner !== Terraria.Main.myPlayer) return true;

        const from = player.Center;
        const mouse = Terraria.Main.MouseWorld;
        let direction = Vector2.Subtract(mouse, from);
        direction = Vector2.SafeNormalize(direction, Vector2.new(player.direction, 0));

        const speed = 10.5;
        const velocity = Vector2.Multiply(direction, speed);
        const spawnPosition = Vector2.Add(from, Vector2.Multiply(direction, 26));
        const projectileType = ModProjectile.getTypeByName('ResoniteWave');

        if (projectileType != null) {
            NewProjectile(
                player.GetProjectileSource_Item(item),
                spawnPosition,
                velocity,
                projectileType,
                Math.max(1, Math.floor(item.damage * 0.7)),
                item.knockBack * 0.65,
                owner,
                0,
                0,
                0,
                null
            );
        }

        return true;
    }

    AddRecipes() {
        this.CreateRecipe()
            .AddIngredient(ModItem.getTypeByName('ResoniteBar'), 7)
            .AddTile(Terraria.ID.TileID.Anvils)
            .Register();
    }
}
