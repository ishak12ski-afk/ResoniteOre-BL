// Bunny Loader API v2; ported from ResoniteOre 1.5.

export class ResoniteHammer extends ModItem {
    SetDefaults() {
        this.Item.melee = true;
        this.Item.hammer = 80;
        this.SetWeaponValues(16, 5, 2);
        this.SetDefaultWeaponStyle(17, true);
        this.Item.value = Terraria.Item.sellPrice(0, 0, 48, 0);
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
