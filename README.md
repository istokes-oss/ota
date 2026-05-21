# Open-Tertium-Archivist (OTA)

Open-source extraction and validation tooling for Warhammer
40,000: Darktide builds.

OTA currently focuses on extracting structured build information
from Games Lantern build pages using browser-side JavaScript
extraction.

---

# Current Features

- Active talent extraction
- Weapon extraction
- Blessing extraction
- Curio extraction
- JSON formatted output

---

# Current Status

OTA is currently in early alpha development.

Validated against:
- Arbites

The extractor is currently designed around structural DOM
discovery rather than fixed positional assumptions in order to
improve resilience against future Darktide UI changes.

---

# Supported Sources

Currently supported:
- Games Lantern Darktide Builds

Example:
https://darktide.gameslantern.com/

---

# Usage

## 1. Create Your Build

Create your Darktide build using the Games Lantern build
calculator:

https://darktide.gameslantern.com/build-editor

Once your build is complete, open the generated build page.

---

## 2. Open Firefox Developer Console

Press:

```text
F12
```

This will open the Firefox Developer Tools window.

Select the:

```text
Console
```

tab.

---

## 3. Load OTA Extractor

Open the `extractor.js` file from this repository.

Copy the entire contents of the script.

Paste the script into the Firefox console and press:

```text
Enter
```

---

## 4. Copy Extracted Output

OTA will output structured JSON directly into the console.

Copy the generated JSON output for:
- archival
- validation
- sharing
- future tooling support

---

# Example Output

```json
{
  "talents": [
    "voice-of-command",
    "focus-target",
    "target-down"
  ],
  "weapons": [
    {
      "name": "Lucius MK V Helbore Lasgun",
      "perks": [
        "10-25% Damage (Flak Armoured Enemies)"
      ],
      "blessings": [
        {
          "name": "Falter",
          "description":
            "Increased stagger on enemies by +90%, on Weakspot hit."
        }
      ]
    }
  ],
  "curios": [
    "+1 Wound(s)",
    "+5-20% Damage Resistance (Snipers)"
  ]
}
```

---

# Validation Environment

OTA alpha validation was performed using:

| Component | Version |
|---|---|
| Browser | Firefox |
| Game | Warhammer 40,000: Darktide |
| Build Source | Games Lantern |
| Tested Class | Arbites |

Future OTA releases will track:
- Firefox version
- Darktide version
- Games Lantern layout revisions
- Additional class compatibility

---

# Known Issues

Current alpha limitations include:

- Blessing/perk classification can occasionally misidentify
  entries
- Weapon descriptions may occasionally leak into curio
  extraction
- DOM structure assumptions may break following Games Lantern
  layout updates
- Additional Darktide classes still require validation testing

---

# Design Goals

OTA is intended to become:

- A resilient Darktide build extraction framework
- A validation and regression-testing platform
- A schema-driven tooling ecosystem for Darktide builds
- Resistant to future UI layout changes where possible

---

# Planned Features

- Improved structural blessing detection
- Regression validation suite
- JSON schema validation
- CI/Jenkins integration
- Darktide version compatibility tracking
- Additional class validation
- Potential CLI tooling

---

# License

MIT License
