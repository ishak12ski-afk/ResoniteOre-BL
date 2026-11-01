# ResoniteOre

**Idioma:** [English](README.md) | [Русский](README.ru.md) | Português | [Français](README.fr.md)

ResoniteOre é um mod para Terraria Mobile desenvolvido para o [Bunny Loader](https://github.com/JonataOliveiraa/Bunny-Loader). Ele adiciona um novo minério subterrâneo, um conjunto de ferramentas, uma espada e novas habilidades de movimentação.

**Versão atual:** 1.5.2  
**Plataforma:** Terraria Mobile, Bunny Loader API v2  
**Status:** Em desenvolvimento. Algumas funcionalidades ainda não foram verificadas dentro do jogo.

## Funcionalidades

- **Minério de Resonite:** foi projetado para surgir no subsolo após derrotar o Devorador de Mundos (Eater of Worlds) ou o Cérebro de Cthulhu (Brain of Cthulhu), inclusive em mundos já existentes.
- **Barras de Resonite:** produzidas ao fundir o minério e usadas para fabricar equipamentos.
- **Picareta de Resonite:** 75% de poder de mineração.
- **Machado de Resonite:** 110% de poder de machado.
- **Martelo de Resonite:** 80% de poder de martelo.
- **Espada de Resonite:** a cada segundo golpe, lança uma onda de ressonância.
- **Bônus de movimento:** aumenta a velocidade de movimento em 20%.
- **Investida:** toque duas vezes rapidamente para a esquerda ou direita para avançar nessa direção, de forma semelhante ao Escudo de Cthulhu. A implementação atual usa uma janela de aproximadamente 0,42 segundo para o toque duplo e um tempo de recarga de 0,58 segundo.

O mod contém localização dentro do jogo em inglês e russo. Esta página em português é uma tradução da documentação.

## Instalação

1. Instale uma versão do Bunny Loader compatível com a sua versão do Terraria Mobile.
2. Obtenha o arquivo `.bl` do mod, caso você já tenha uma versão empacotada. Para empacotar o código-fonte deste repositório, coloque `manifest.json` e a pasta `content/` na raiz de um arquivo ZIP e depois altere a extensão de `.zip` para `.bl`.
3. Abra o Bunny Loader, importe o pacote `.bl` e ative o mod.
4. Inicie o Terraria e entre no seu mundo.

**Observação:** atualmente, este repositório contém o código-fonte do mod, mas ainda não disponibiliza um arquivo `.bl` pronto. Os dados de mods do TL Pro não são convertidos automaticamente para o formato do Bunny Loader. Faça uma cópia de segurança dos seus mundos antes de testar.

## Estrutura do código-fonte

```text
manifest.json
content/
  main.js
  Common/
    Players/          Bônus de movimento e investida por toque duplo
    Systems/          Lógica de geração do minério
  Content/
    Items/            Minério, barras, ferramentas e espada
    Projectiles/      Onda de ressonância
    Tiles/            Bloco de minério de Resonite
  Localization/
    en-US.json
    ru-RU.json
```

## Estado do desenvolvimento

O ResoniteOre começou como um mod para TL Pro e depois foi adaptado para Bunny Loader API v2. O código atual inclui classes de jogabilidade em JavaScript e arquivos de localização, mas a instalação bem-sucedida não garante que todas as mecânicas funcionem corretamente no Terraria.

Se você encontrar erros, especialmente na geração do minério ou na investida, [abra uma issue](https://github.com/ishak12ski-afk/ResoniteOre-BL/issues) e informe as versões do Terraria e do Bunny Loader.

## Créditos e agradecimentos

- **[ishak12ski-afk](https://github.com/ishak12ski-afk) / equipe ResoniteOre** — conceito original do mod, desenvolvimento e manutenção do projeto.
- **ChatGPT da OpenAI** — ajuda com o código, migração do TL Pro para o Bunny Loader, resolução de problemas e documentação.
- **[JonataOliveiraa](https://github.com/JonataOliveiraa/Bunny-Loader) e colaboradores do Bunny Loader** — desenvolvimento do Bunny Loader e do mod de exemplo usado como referência para a adaptação.

Obrigado a todos que testam o mod e relatam problemas.
