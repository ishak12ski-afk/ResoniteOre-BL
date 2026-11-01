// Bunny Loader API v2; ported from ResoniteOre 1.5.

export class ResoniteOre extends ModItem {
    SetDefaults() {
        this.DefaultToPlaceableTile(ModContent.TileType('ResoniteTile'));
        this.Item.material = true;
        this.Item.value = Terraria.Item.sellPrice(0, 0, 3, 0);
        this.Item.rare = Terraria.ID.ItemRarityID.Blue;
    }
}
