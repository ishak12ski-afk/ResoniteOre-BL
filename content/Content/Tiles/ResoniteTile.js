// The original TL Pro version replaced the vanilla green team block.
// Bunny Loader supports real custom tiles, so Resonite has its own tile type.
const { DustID, SoundID, TileID } = Terraria.ID;

export class ResoniteTile extends ModTile {
    constructor() {
        super();
        this.DustType = DustID.Platinum;
        this.HitSound = SoundID.Tink;
        this.MineResist = 1.15;
        this.MinPick = 65;
    }

    SetStaticDefaults() {
        const Main = Terraria.Main;
        Main.tileSolid[this.Type] = true;
        Main.tileBlockLight[this.Type] = true;
        Main.tileMergeDirt[this.Type] = true;
        Main.tileMerge[this.Type][this.Type] = true;
        Main.tileOreFinderPriority[this.Type] = 450;
        Main.tileShine[this.Type] = 650;
        Main.tileShine2[this.Type] = true;
        Main.tileSpelunker[this.Type] = true;
        TileID.Sets.Ore[this.Type] = true;
        this.AddMapEntry(Color.new(82, 222, 244), 'ResoniteTile');
    }

    PostSetupContent() {
        // The original ResoniteOre material item is also the tile's drop.
        this.ItemDrop = ModContent.ItemType('ResoniteOre');
    }
}
