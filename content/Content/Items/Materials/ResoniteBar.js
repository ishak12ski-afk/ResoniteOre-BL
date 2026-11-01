// Bunny Loader API v2; ported from ResoniteOre 1.5.

export class ResoniteBar extends ModItem {
    SetDefaults() {
        this.Item.maxStack = 9999;
        this.Item.material = true;
        this.Item.value = Terraria.Item.sellPrice(0, 0, 8, 0);
        this.Item.rare = Terraria.ID.ItemRarityID.Blue;
    }

    AddRecipes() {
        this.CreateRecipe(1)
            .AddIngredient(ModItem.getTypeByName('ResoniteOre'), 2)
            .AddTile(Terraria.ID.TileID.Furnaces)
            .Register();
    }
}
