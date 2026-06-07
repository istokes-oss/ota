# Games Lantern DOM Analysis

## Validation Date

2026-06-07

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

---

## Outstanding Work

### Blessing Refactor

Replace:

```javascript
const knownBlessings = [...]
```

with structural extraction.

Status:

READY

### Perk Extraction

Current extraction remains heuristic based.

Status:

PENDING

### Curio Extraction

Current extraction remains text based.

Status:

PENDING

### Hive Scum Stimm Lab

Not yet investigated.

Status:

PENDING

### Skitarii Validation

Required after class release.

Status:

PENDING
