// Bunny Loader API v2; ported from ResoniteOre 1.5.

export class ResonitePickaxe extends ModItem {
    SetDefaults() {
        this.Item.melee = true;
        this.Item.pick = 75;
        this.SetWeaponValues(15, 5, 2);
        this.SetDefaultWeaponStyle(15, true);
        this.Item.value = Terraria.Item.sellPrice(0, 0, 60, 0);
        this.Item.rare = Terraria.ID.ItemRarityID.Green;
        this.Item.UseSound = Terraria.ID.SoundID.Item1;
    }

    AddRecipes() {
        this.CreateRecipe()
            .AddIngredient(ModItem.getTypeByName('ResoniteBar'), 9)
            .AddTile(Terraria.ID.TileID.Anvils)
            .Register();
    }
}
