// ResoniteOre 1.5.2 - Bunny Loader API v2 port of the TL Pro mod.
// Files in Content/ and Common/ are auto-registered by Bunny Loader.
export default class ResoniteMod extends Mod {
    PostSetupContent() {
        bl.log('[Resonite] 1.5.2 loaded. Ore tile=' + ModContent.TileType('ResoniteTile') +
               ', sword=' + ModContent.ItemType('ResoniteSword'));
    }
}
