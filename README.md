# parcel-validator-stylelint
A Parcel 2 validator plugin for Stylelint.

## Usage
1. Install the plugin package (`@parcel/validator-stylelint`)
2. Add enable this plugin in your .parcelrc:
```json
{
  "extends": "@parcel/config-default",
  "validators": {
    "*.css": ["@parcel/validator-stylelint"]
  }
}
```
