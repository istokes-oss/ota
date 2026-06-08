# Games Lantern DOM Analysis

## Validation Date

2026-06-08

## Classes Validated

- Arbites
- Veteran
- Ogryn
- Psyker
- Zealot
- Hive Scum

---

## Talent Structure

Active talents:

```javascript
document.querySelectorAll('.ability-active')
```

Talent identifiers:

```javascript
node.parentElement.getAttribute('href')
```

Example:

```text
https://darktide.gameslantern.com/abilities/the-best-defence
https://darktide.gameslantern.com/abilities/smash-em
```

Identifier extraction:

```javascript
/\/abilities\/([a-z0-9-]+)/
```

Status:

PASS

---

## Weapon Card Structure

Weapon cards:

```javascript
document.querySelectorAll('.max-w-sm.w-full')
```

Observed layout:

```text
Card 0 -> View more <Class> builds
Card 1 -> Weapon 1
Card 2 -> Weapon 2
```

Status:

PASS

---

## Perk Structure

Within weapon cards:

```html
<div class="flex gap-8 items-center py-2 px-6">
    <div class="w-1.5 h-1.5 bg-[#D1FFC3] rotate-45"></div>
    <div class="text-[#D1FFC3] font-bold text-sm">
        Perk Text
    </div>
</div>
```

Extraction:

```javascript
card.querySelectorAll(
    '.flex.gap-8.items-center.py-2.px-6'
)
```

Perk value:

```javascript
node.querySelector(
    '.text-\\[\\#D1FFC3\\].font-bold.text-sm'
)
```

Status:

PASS

---

## Blessing Structure

Within weapon cards:

```html
<div class="flex flex-col">
    <h3>Blessing Name</h3>
    <p>Blessing Description</p>
</div>
```

Extraction:

```javascript
card.querySelectorAll('h3')
```

Description:

```javascript
h3.parentElement?.querySelector('p')
```

Validated Blessings:

### Arbites

- Hammerblow
- Falter
- Punishing Salvo
- Powderburn

### Veteran

- Brutal Momentum
- All or Nothing

### Ogryn

- Skullcrusher
- Brutal Momentum
- Blaze Away
- Shattering Impact

### Psyker

- Riposte
- Slaughterer
- Warp Nexus
- Surge

### Zealot

- Thunderstrike
- Trauma
- Terrifying Barrage
- Blaze Away

### Hive Scum

- Executor
- Precognition
- Inspiring Barrage
- Sustained Fire

Status:

PASS

---

## Curio Structure

Curio section anchor:

```html
<div id="curios">
```

Curio container:

```javascript
document.getElementById('curios')
    ?.nextElementSibling
```

Curio cards:

```javascript
curiosContainer.children
```

Observed layout:

```text
Curio Card
├── Name
├── Rarity
├── Primary Stat
└── 3 Secondary Perks
```

Primary stat:

```javascript
card.querySelector('h3')
```

Example:

```text
+1 Wound(s)
+1-3 Max Stamina
```

Secondary perks:

```javascript
card.querySelectorAll(
    '.flex.gap-8.items-center.py-2.px-6.h-10'
)
```

Status:

PASS

---

## Incorrect Assumptions

### Blessing Containers

Initial assumption:

```javascript
.bg-black\/25
```

Finding:

FALSE

Matches:

- Blessing panels
- Curio panels

Should not be used as a blessing selector.

### Perk Detection

Initial assumption:

```javascript
line.includes('Damage')
line.includes('Weak Spot')
```

Finding:

FALSE

Blessing descriptions can contain the same text.

Structural extraction is required.

---

## Validation Summary

Validated Successfully:

- Talent extraction
- Weapon identification
- Perk extraction
- Blessing extraction
- Curio extraction
- Partial talent trees
- Full talent trees
- Hive Scum talent tree
- All currently released classes

Status:

PASS

---

## Outstanding Work

### Weapon Name Extraction

Current extraction:

```javascript
const name = lines[0];
```

Potential future improvement:

DOM-based extraction.

Status:

LOW PRIORITY

### Hive Scum Stimm Lab

Talent extraction functions correctly.

Additional Stimm Lab specific extraction has not yet been investigated.

Status:

PENDING

### Skitarii Validation

Required after class release.

Status:

PENDING
