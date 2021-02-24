# parcel-validator-stylelint
A Parcel 2 validator plugin for Stylelint.

## Usage
1. Install the plugin package (`parcel-validator-stylelint`)
2. Add enable this plugin in your .parcelrc (if you didn't have a .parcelrc, also install `@parcel/config-default`):
```json
{
  "extends": "@parcel/config-default",
  "validators": {
    "*.css": ["parcel-validator-stylelint"]
  }
}
```

## Known issues
### Warning highlight locations
Stylelint doesn't provide any information on where the broken places stop, so this plugin simply assumes that it's the end of the line.
Sometimes it's not, but that's the best I can do without doing any additional CSS parsing. 

### `@parcel/` package scope
Having this package under the `@parcel/` package scope would require incorporating it into Parcel's repository, and I don't want to do that yet.
