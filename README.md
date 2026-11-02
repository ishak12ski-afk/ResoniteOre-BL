# ResoniteOre

**Language:** English | [Русский](README.ru.md) | [Português](README.pt.md) | [Français](README.fr.md)

ResoniteOre is a Terraria Mobile mod built for [Bunny Loader](https://github.com/JonataOliveiraa/Bunny-Loader). It adds a new underground resource, a set of tools and a sword, and new movement abilities.

**Current version:** 1.5.3  
**Platform:** Terraria Mobile, Bunny Loader API v2  
**Status:** Work in progress. Some features have not yet been verified in-game.

## Features

- **Resonite ore:** Intended to generate underground after defeating the Eater of Worlds or Brain of Cthulhu, including in existing worlds.
- **Resonite bars:** Smelted from the ore and used to craft equipment.
- **Resonite pickaxe:** 75% pickaxe power.
- **Resonite axe:** 110% axe power.
- **Resonite hammer:** 80% hammer power.
- **Resonite sword:** Custom two-part swing combo: an overhead slash followed by a returning upward slash. Every second swing releases a resonance wave.
- **Movement boost:** Increases movement speed by 20%.
- **Dash:** Double-tap left or right to dash in that direction, similar to the Shield of Cthulhu. The current implementation uses an approximately 0.42-second double-tap window and a 0.58-second cooldown.

The mod includes both English and Russian in-game localization.

## Installation

1. Install a version of Bunny Loader compatible with your Terraria Mobile version.
2. Get the mod's `.bl` archive, if you already have a packaged build. To package the repository source yourself, put `manifest.json` and the `content/` folder at the root of a ZIP archive, then rename the archive extension from `.zip` to `.bl`.
3. Open Bunny Loader, import the `.bl` package, and enable the mod.
4. Start Terraria and enter your world.

**Note:** This repository currently contains the mod source. There is no packaged `.bl` file in the repository yet. TL Pro mod saves are not automatically converted to Bunny Loader format. Keep backups of your worlds before testing.

## Source layout

```text
manifest.json
content/
  main.js
  Common/
    Players/
    Systems/
  Content/
    Items/
    Projectiles/
    Tiles/
  Localization/
    en-US.json
    ru-RU.json
```

## Development status

ResoniteOre started as a TL Pro mod and was adapted to Bunny Loader API v2. The current source includes JavaScript gameplay classes and localization files, but a successful installation does not guarantee that every mechanic works correctly in Terraria.

If you find bugs, especially problems with ore generation or dashing, please [open an issue](https://github.com/ishak12ski-afk/ResoniteOre-BL/issues) and describe your Terraria and Bunny Loader versions.

## Credits

- **[ishak12ski-afk](https://github.com/ishak12ski-afk) / ResoniteOre team** — original mod concept, development, and project maintenance.
- **ChatGPT by OpenAI** — assistance with code, migration from TL Pro to Bunny Loader, troubleshooting, and documentation.
- **[JonataOliveiraa](https://github.com/JonataOliveiraa/Bunny-Loader) and Bunny Loader contributors** — development of Bunny Loader and its example mod, which served as a reference for the port.

Thanks to everyone who tests the mod and reports issues.
