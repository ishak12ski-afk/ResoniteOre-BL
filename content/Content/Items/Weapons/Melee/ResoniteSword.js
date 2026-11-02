// Resonite Sword: a true projectile-driven three-attack combo.
// Attack 1: sharp stab. Attack 2: upward cut. Attack 3: charged heavy slash.
const NewProjectile = Terraria.Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2, NewProjectileModifier modifer)'];

export class ResoniteSword extends ModItem {
    SetDefaults() {
        this.Item.melee = true;
        this.Item.noMelee = true;       // The held slash projectile handles collision.
        this.Item.noUseGraphic = true; // Do not draw Terraria's default sword swing.
        this.SetWeaponValues(22, 5.5, 4);
        this.SetDefaultWeaponStyle(27, true);
        this.Item.shoot = ModProjectile.getTypeByName('ResoniteSlash');
        this.Item.shootSpeed = 1;
        this.Item.value = Terraria.Item.sellPrice(0, 0, 45, 0);
        this.Item.rare = Terraria.ID.ItemRarityID.Green;
        this.Item.UseSound = Terraria.ID.SoundID.Item1;
    }

    MeleePrefix() { return true; }

    Shoot(item, player, position, velocity, type, damage, knockBack) {
        // Count actual attacks only, not per-frame item updates.
        if (player.whoAmI !== Terraria.Main.myPlayer) return false;

        this.comboCounter = (this.comboCounter ?? 0) + 1;
        const stage = (this.comboCounter - 1) % 3;
        player.direction = Terraria.Main.MouseWorld.X < player.Center.X ? -1 : 1;
        const facing = player.direction * player.gravDir;

        NewProjectile(
            player.GetProjectileSource_Item(item),
            player.MountedCenter,
            Vector2.new(player.direction, 0),
            type, damage, knockBack, player.whoAmI,
            stage, Math.max(18, player.itemAnimationMax), facing, null
        );
        return false; // Suppress automatic vanilla projectile.
    }

    AddRecipes() {
        this.CreateRecipe()
            .AddIngredient(ModItem.getTypeByName('ResoniteBar'), 7)
            .AddTile(Terraria.ID.TileID.Anvils)
            .Register();
    }
}
