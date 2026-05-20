(() => {

    console.log("=== Darktide Build Exporter ===");

    const build = {
        talents: [],
        weapons: [],
        curios: []
    };

    /*
        HELPERS
    */

    const unique = arr => [...new Set(arr)];

    const cleanText = text =>
        text
            ?.replace(/\s+/g, ' ')
            ?.trim();

    /*
        Generic weapon stat pattern:
        [76/80]%
        [52/80]%
        etc.
    */

    const isWeaponStat = line =>
        /^\[\d+\/\d+\]%$/.test(line);

    /*
        TALENTS (active only)
    */

    try {

        build.talents = [
            ...document.querySelectorAll('.ability-active')
        ]
        .map(node => node.parentElement)
        .filter(a => a)
        .map(a => a.getAttribute('href'))
        .filter(Boolean)
        .map(href => {

            const match = href.match(/\/abilities\/([a-z0-9-]+)/);

            return match ? match[1] : null;

        })
        .filter(Boolean);

    } catch (error) {

        console.error("Talent extraction failed:", error);

    }

    /*
        WEAPONS
    */

    try {

        const weaponCards = [
            ...document.querySelectorAll('.max-w-sm.w-full')
        ];

        build.weapons = weaponCards
            .map(card => {

                const lines = card.innerText
                    .split('\n')
                    .map(cleanText)
                    .filter(Boolean);

                const name = lines[0];

                /*
                    Ignore fake/non-weapon cards
                */

                if (
                    !name ||
                    name === 'Arbites' ||
                    !(
                        name.includes('Mk') ||
                        name.includes('Sword') ||
                        name.includes('Shotgun') ||
                        name.includes('Maul') ||
                        name.includes('Stubber') ||
                        name.includes('Lasgun') ||
                        name.includes('Autogun')
                    )
                ) {
                    return null;
                }

                const perks = [];
                const blessings = [];

                const knownBlessings = [
                    'Hammerblow',
                    'Falter',
                    'Punishing Salvo',
                    'Powderburn'
                ];

                for (let i = 0; i < lines.length; i++) {

                    const line = lines[i];

                    /*
                        Ignore weapon stat blocks
                    */

                    if (
                        isWeaponStat(line) ||
                        [
                            'Penetration',
                            'Finesse',
                            'Crowd Control',
                            'Damage',
                            'Mobility',
                            'Ammo',
                            'Stopping Power',
                            'Stability'
                        ].includes(line)
                    ) {
                        continue;
                    }

                    /*
                        Blessings
                    */

                    if (knownBlessings.includes(line)) {

                        blessings.push({
                            name: line,
                            description: lines[i + 1] || ''
                        });

                        continue;
                    }

                    /*
                        Skip blessing descriptions
                    */

                    if (
                        blessings.some(
                            b => b.description === line
                        )
                    ) {
                        continue;
                    }

                    /*
                        Perks
                    */

                    if (
                        line.includes('Damage') ||
                        line.includes('Weak Spot')
                    ) {

                        perks.push(line);

                    }

                }

                return {
                    name,
                    perks: unique(perks),
                    blessings: unique(
                        blessings.map(x => JSON.stringify(x))
                    ).map(x => JSON.parse(x))
                };

            })
            .filter(Boolean);

    } catch (error) {

        console.error("Weapon extraction failed:", error);

    }

    /*
        CURIOS
    */

    try {

        const allLines = document.body.innerText
            .split('\n')
            .map(cleanText)
            .filter(Boolean);

        const curiosStart = allLines.indexOf("Curios");

        if (curiosStart !== -1) {

            const curiosLines = allLines
                .slice(curiosStart + 1);

            build.curios = unique(
                curiosLines.filter(line => {

                    return (
                        (
                            line.includes("%") &&
                            (
                                line.includes("Resistance") ||
                                line.includes("Regeneration") ||
                                line.includes("Toughness")
                            )
                        ) ||
                        line.includes("Wound") ||
                        line.includes("Stamina") ||
                        line.includes("Corruption")
                    );

                })
            );

        }

    } catch (error) {

        console.error("Curio extraction failed:", error);

    }

    /*
        FINAL CLEANUP
    */

    build.talents = unique(build.talents);

    console.log("=== Extraction Complete ===");

    console.log(build);

    console.log(
        JSON.stringify(build, null, 2)
    );

    return build;

})();
