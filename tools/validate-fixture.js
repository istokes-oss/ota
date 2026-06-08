const fs = require('fs');
const { JSDOM } = require('jsdom');

const { extractBuild } = require('../src/extractor');

const fixture = process.argv[2];

if (!fixture) {

    console.error(
        'Usage: node tools/validate-fixture.js <html-file>'
    );

    process.exit(1);

}

const html = fs.readFileSync(
    fixture,
    'utf8'
);

const dom = new JSDOM(html);

const build = extractBuild(
    dom.window.document
);

if (build.weapons.length < 2) {

    console.error(
        'Validation failed: expected at least 2 weapons'
    );

    process.exit(1);

}

console.log(
    'Validation passed'
);

