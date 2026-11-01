// Resonite Ore 1.5.2 — Bunny Loader API v2.
// Generate after Eater of Worlds / Brain of Cthulhu, including older worlds.
// Important: PostUpdateTime is NOT a Bunny Loader hook. PostUpdateNPCs is.
// Do not run TileRunner for mod tiles: convert existing stone with ResetToType.
const Main = Terraria.Main;
const WorldGen = Terraria.WorldGen;
const TileID = Terraria.ID.TileID;
const TileAt = (x, y) => Main.tile['Tile get_Item(int x, int y)'](x, y);
const RangeFrame = WorldGen['void RangeFrame(int startX, int startY, int endX, int endY)'];
const STONE = [TileID.Stone, TileID.Ebonstone, TileID.Crimstone];

function randomInt(min, maxExclusive) {
    return Math.floor(min + Math.random() * (maxExclusive - min));
}

export class ResoniteSystem extends ModSystem {
    constructor() {
        super();
        this.ResetState();
    }

    ResetState() {
        this.generated = false;
        this.started = false;
        this.delay = 0;
        this.retryCooldown = 0;
        this.targetVeins = 0;
        this.veinsMade = 0;
        this.blocksMade = 0;
        this.attempts = 0;
        this.maxAttempts = 0;
        this.oreType = -1;
        this.minY = 0;
        this.maxY = 0;
        this.failureLogged = false;
    }

    ClearWorld() { this.ResetState(); }
    OnWorldLoad() { this.ResetState(); }
    OnWorldUnload() { this.ResetState(); }

    LoadWorldData(tag) {
        // No flag was saved by the broken 1.5.1 version, so existing worlds
        // will be automatically populated after upgrading to 1.5.2.
        this.generated = tag.ContainsKey('resoniteGenerated');
    }

    SaveWorldData(tag) {
        if (this.generated) tag.resoniteGenerated = true;
    }

    // Documented Bunny Loader callback, called after NPC updates in the world.
    // The downedBoss2 flag is also already true on worlds where the boss died
    // before this mod was installed.
    PostUpdateNPCs() {
        if (this.generated || Main.netMode === 1 || !Terraria.NPC.downedBoss2) return;
        if (this.retryCooldown > 0) {
            this.retryCooldown--;
            return;
        }
        if (!this.started) {
            if (++this.delay < 120) return;
            if (!this.BeginGeneration()) {
                this.retryCooldown = 600;
                this.delay = 0;
                return;
            }
        }

        // A small budget each tick avoids freezing Terraria on phones.
        let veinsThisTick = 0;
        for (let i = 0; i < 64 && veinsThisTick < 2 &&
             this.attempts < this.maxAttempts && this.veinsMade < this.targetVeins; i++) {
            this.attempts++;
            const x = randomInt(70, Main.maxTilesX - 70);
            const y = randomInt(this.minY, this.maxY);
            if (!this.IsStone(x, y)) continue;

            let changed = 0;
            try {
                changed = this.PlaceVein(x, y);
            } catch (e) {
                if (!this.failureLogged) {
                    this.failureLogged = true;
                    bl.error('[Resonite] Cannot place ore: ' + e);
                }
                this.started = false;
                this.retryCooldown = 600;
                this.delay = 0;
                return;
            }
            if (changed > 0) {
                this.blocksMade += changed;
                this.veinsMade++;
                veinsThisTick++;
            }
        }

        if (this.veinsMade >= this.targetVeins || this.attempts >= this.maxAttempts) {
            this.started = false;
            this.delay = 0;
            if (this.blocksMade > 0) {
                this.generated = true;
                bl.log('[Resonite] Generated ' + this.blocksMade +
                       ' ore blocks in ' + this.veinsMade + ' veins.');
                if (Main.netMode !== 2) {
                    bl.chat(ModLocalization.Translate('CustomText.ResoniteAppeared'), '#52DEF4');
                }
            } else {
                this.retryCooldown = 600;
                bl.log('[Resonite] No suitable stone found; will retry.');
            }
        }
    }

    BeginGeneration() {
        this.oreType = ModContent.TileType('ResoniteTile');
        if (this.oreType < bl.tiles.vanillaCount ||
            Main.maxTilesX < 300 || Main.maxTilesY < 500) {
            bl.log('[Resonite] Invalid tile type or world size: ' + this.oreType);
            return false;
        }

        // Underground and cavern layers, not in the underworld.
        this.minY = Math.max(70,
            Math.floor(Main.worldSurface) + 20,
            Math.floor(Main.rockLayer) - 80);
        this.maxY = Main.maxTilesY - 230;
        if (this.maxY <= this.minY + 25) return false;

        const area = Main.maxTilesX * Main.maxTilesY;
        this.targetVeins = Math.min(450, Math.max(180, Math.floor(area / 18000)));
        this.maxAttempts = this.targetVeins * 80;
        this.veinsMade = 0;
        this.blocksMade = 0;
        this.attempts = 0;
        this.started = true;
        this.failureLogged = false;
        bl.log('[Resonite] Boss defeated: generating ' + this.targetVeins +
               ' veins in the underground...');
        return true;
    }

    IsStone(x, y) {
        return STONE.includes(bl.tiles.typeAt(x, y));
    }

    PlaceVein(cx, cy) {
        const rx = randomInt(2, 5);
        const ry = randomInt(2, 4);
        let placed = 0;
        for (let dx = -rx; dx <= rx; dx++) {
            for (let dy = -ry; dy <= ry; dy++) {
                const distance = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
                if (distance > 1.1 || Math.random() < 0.13) continue;
                const x = cx + dx, y = cy + dy;
                if (x < 12 || y < 12 || x >= Main.maxTilesX - 12 ||
                    y >= Main.maxTilesY - 12 || !this.IsStone(x, y)) continue;
                // Same native tile getter and ResetToType used by the Bunny
                // Loader example structure. Ensures active, correctly typed ore.
                const tile = TileAt(x, y);
                if (!tile) continue;
                tile['void ResetToType(ushort type)'](this.oreType);
                if (bl.tiles.typeAt(x, y) === this.oreType) placed++;
            }
        }
        if (placed > 0) {
            RangeFrame(cx - rx - 1, cy - ry - 1, cx + rx + 2, cy + ry + 2);
        }
        return placed;
    }
}
