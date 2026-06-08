function extractBuild(document) {

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

    const getText = node =>
        cleanText(
            node?.textContent
    );


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

                const lines = card.textContent
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

                const blessings = [];

		const blessingNodes = [
		    ...card.querySelectorAll('h3')
		];

		blessingNodes.forEach(h3 => {

			const name = getText(
			    h3
			);

		        const description = getText(
		            h3.parentElement
		            ?.querySelector('p')
			);

			if (name) {

			        blessings.push({
			        name,
			        description: description || ''
			        });

			}

		});


		const perks = [
		    ...card.querySelectorAll(
		        '.flex.gap-8.items-center.py-2.px-6'
		    )
		]
		.map(node =>
		    getText(
		        node.querySelector(
		            '.text-\\[\\#D1FFC3\\].font-bold.text-sm'
		        )
		    )
		)
		.filter(Boolean);


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

    	const curiosContainer =
        	document.getElementById('curios')
	        ?.nextElementSibling;

	    const curioCards = [
        	...(curiosContainer?.children || [])
	    ];

	    build.curios = curioCards.map(card => {

        	const primary = getText(
	            card.querySelector('h3')
	        );

        	const perks = [
	            ...card.querySelectorAll(
        	        '.flex.gap-8.items-center.py-2.px-6.h-10'
	            )
        	]
	        .map(node =>
        	    getText(
	                node.querySelector(
        	            '.text-\\[\\#D1FFC3\\].text-sm.leading-4'
	                )
	            )
	        )
	        .filter(Boolean);

	        return {
	            primary,
	            perks
	        };

	    });

	} catch (error) {

	    console.error(
	        "Curio extraction failed:",
	        error
	    );

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

}

module.exports = {
    extractBuild
};
