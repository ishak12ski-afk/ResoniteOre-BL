// Resonite sword: custom two-part slash combo and a wave on every second swing.
// Bunny Loader API v2: UseStyle runs after Terraria's built-in use animation.

const NewProjectile = Terraria.Projectile['int NewProjectile(IEntitySource spawnSource, Vector2 position, Vector2 velocity, int Type, int Damage, float KnockBack, int Owner, float ai0, float ai1, float ai2, NewProjectileModifier modifer)'];

export class ResoniteSword extends ModItem {
    SetDefaults() {
        this.Item.melee = true;
        this.SetWeaponValues(22, 5.5, 4);
        this.SetDefaultWeaponStyle(20, true);
        this.Item.value = Terraria.Item.sellPrice(0, 0, 45, 0);
        this.Item.rare = Terraria.ID.ItemRarityID.Green;
        this.Item.UseSound = Terraria.ID.SoundID.Item1;
    }

    // UseStyle is called each animation frame, after the vanilla style.
    // Alternate an overhead cut with a returning upward slash.
    // The regular melee collision and sword damage are preserved.
    UseStyle(item, player, mountOffset, heldItemFrame) {
        if (player.itemAnimation <= 0 || player.itemAnimationMax <= 0) return;

        const owner = player.whoAmI;
        const swing = this.swingCounts?.[owner] ?? 1;
        const returningSlash = swing % 2 === 0;

        // 0..1 over one real attack, even when melee speed changes.
        const progress = Math.max(0, Math.min(1,
            1 - player.itemAnimation / player.itemAnimationMax
        ));
        // Smoothly accelerate into the cut, then ease out.
        const eased = progress * progress * (3 - 2 * progress);

        // Two mirrored arcs, expressed as radians relative to facing direction.
        // First cut: above the shoulder -> forward/down.
        // Second cut: forward/down -> above the shoulder (backhand).
        const angle = returningSlash
            ? 1.15 - 2.50 * eased
            : -1.75 + 2.70 * eased;

        player.itemRotation = angle * player.direction * player.gravDir;

        // Push the hilt slightly out from the hand near the middle of the arc.
        // Keep the engine's hand position so this works with mounts and gravity.
        const reach = Math.sin(progress * Math.PI) * 6;
        const hand = player.itemLocation;
        hand.X += player.direction * reach;
        hand.Y -= player.gravDir * Math.sin(progress * Math.PI) * 2;
    }

    UseItem(item, player) {
        // Bunny Loader calls UseItem once when a new swing starts.
        const owner = player.whoAmI;
        this.swingCounts ??= Object.create(null);
        this.swingCounts[owner] = (this.swingCounts[owner] ?? 0) + 1;

        // The second (returning) slash releases a resonance wave.
        if ((this.swingCounts[owner] % 2) !== 0) return true;
        if (owner !== Terraria.Main.myPlayer) return true;

        const from = player.Center;
        const mouse = Terraria.Main.MouseWorld;
        let direction = Vector2.Subtract(mouse, from);
        direction = Vector2.SafeNormalize(direction, Vector2.new(player.direction, 0));

        const velocity = Vector2.Multiply(direction, 10.5);
        const spawnPosition = Vector2.Add(from, Vector2.Multiply(direction, 26));
        const projectileType = ModProjectile.getTypeByName('ResoniteWave');

        if (projectileType != null) {
            NewProjectile(
                player.GetProjectileSource_Item(item),
                spawnPosition,
                velocity,
                projectileType,
                Math.max(1, Math.floor(item.damage * 0.7)),
                item.knockBack * 0.65,
                owner,
                0,
                0,
                0,
                null
            );
        }

        return true;
    }

    AddRecipes() {
        this.CreateRecipe()
            .AddIngredient(ModItem.getTypeByName('ResoniteBar'), 7)
            .AddTile(Terraria.ID.TileID.Anvils)
            .Register();
    }
}
