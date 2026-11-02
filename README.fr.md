# ResoniteOre

**Langue :** [English](README.md) | [Русский](README.ru.md) | [Português](README.pt.md) | Français

ResoniteOre est un mod pour Terraria Mobile conçu pour [Bunny Loader](https://github.com/JonataOliveiraa/Bunny-Loader). Il ajoute un nouveau minerai souterrain, un ensemble d'outils, une épée et de nouvelles capacités de déplacement.

**Version actuelle :** 1.6.0  
**Plateforme :** Terraria Mobile, Bunny Loader API v2  
**Statut :** En cours de développement. Certaines fonctionnalités n'ont pas encore été vérifiées en jeu.

## Fonctionnalités

- **Minerai de résonite :** conçu pour apparaître sous terre après avoir vaincu le Dévoreur des mondes (Eater of Worlds) ou le Cerveau de Cthulhu (Brain of Cthulhu), y compris dans les mondes déjà existants.
- **Lingots de résonite :** obtenus par la fonte du minerai et utilisés pour fabriquer de l'équipement.
- **Pioche en résonite :** puissance de minage de 75 %.
- **Hache en résonite :** puissance de hache de 110 %.
- **Marteau en résonite :** puissance de marteau de 80 %.
- **Épée en résonite :** enchaînement de trois attaques : une estocade rapide, un coup ascendant, puis une puissante préparation suivie d'un coup final rapide qui libère un grand projectile de résonance.
- **Bonus de déplacement :** augmente la vitesse de déplacement de 20 %.
- **Ruée :** appuyez rapidement deux fois sur la direction gauche ou droite pour effectuer une ruée, comme avec le Bouclier de Cthulhu. Le code actuel utilise un délai d'environ 0,42 seconde pour le double appui et un temps de recharge de 0,58 seconde.

Le mod propose des traductions en jeu en anglais et en russe. Cette page française est une traduction de la documentation.

## Installation

1. Installez une version de Bunny Loader compatible avec votre version de Terraria Mobile.
2. Récupérez l'archive `.bl` du mod si vous disposez déjà d'une version empaquetée. Pour créer l'archive à partir des sources du dépôt, placez `manifest.json` et le dossier `content/` à la racine d'une archive ZIP, puis remplacez l'extension `.zip` par `.bl`.
3. Ouvrez Bunny Loader, importez le fichier `.bl` et activez le mod.
4. Lancez Terraria et entrez dans votre monde.

**Remarque :** ce dépôt contient actuellement le code source du mod, mais aucun fichier `.bl` prêt à importer. Les sauvegardes des mods TL Pro ne sont pas converties automatiquement au format Bunny Loader. Sauvegardez vos mondes avant de procéder aux tests.

## Structure des sources

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

## État du développement

ResoniteOre était à l'origine un mod pour TL Pro, avant d'être adapté à Bunny Loader API v2. Le code actuel contient des classes de gameplay en JavaScript et des fichiers de traduction, mais le simple fait que le mod s'installe correctement ne garantit pas le bon fonctionnement de toutes ses mécaniques dans Terraria.

Si vous rencontrez un problème, notamment avec la génération du minerai ou la ruée, [ouvrez une issue](https://github.com/ishak12ski-afk/ResoniteOre-BL/issues) en indiquant les versions de Terraria et de Bunny Loader.

## Crédits et remerciements

- **[ishak12ski-afk](https://github.com/ishak12ski-afk) / équipe ResoniteOre** — idée originale du mod, développement et maintenance du projet.
- **ChatGPT d'OpenAI** — aide à la programmation, au portage de TL Pro vers Bunny Loader, au dépannage et à la documentation.
- **[JonataOliveiraa](https://github.com/JonataOliveiraa/Bunny-Loader) et les contributeurs de Bunny Loader** — développement du chargeur et du mod d'exemple utilisé comme référence pour le portage.

Merci à toutes les personnes qui testent le mod et signalent des problèmes.
