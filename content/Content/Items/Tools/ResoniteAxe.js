// Bunny Loader API v2; ported from ResoniteOre 1.5.

export class ResoniteAxe extends ModItem {
    SetDefaults() {
        this.Item.melee = true;
        this.Item.axe = 22;
        this.SetWeaponValues(17, 5.5, 2);
        this.SetDefaultWeaponStyle(18, true);
        this.Item.value = Terraria.Item.sellPrice(0, 0, 50, 0);
        this.Item.rare = Terraria.ID.ItemRarityID.Green;
        this.Item.UseSound = Terraria.ID.SoundID.Item1;
    }

    AddRecipes() {
        this.CreateRecipe()
            .AddIngredient(ModItem.getTypeByName('ResoniteBar'), 8)
            .AddTile(Terraria.ID.TileID.Anvils)
            .Register();
    }
}
