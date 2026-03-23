# Periodic Table Explorer

Static periodic-table explorer built to mirror the browsing feel of the dinosaur and videogame atlas apps, but with the table itself as the primary interface.

Each element tile shows its atomic number, symbol, name, and mass. Clicking a tile opens a lesson card with a generated shell visual, quick chemistry facts, and a short summary.
The right-hand sidebar can be collapsed to give the table more width, and the lower pattern deck compares the selected element against its row, column, and curated reaction pathways.

## Open the app

Open [`index.html`](./index.html) in a browser. The app loads a bundled local JavaScript data file, so it does not need a local dev server just to browse.

## Why a table instead of a map

For a periodic table, a world map is not the natural primary UI. Elements are universal, while the periodic table organizes them by atomic structure and chemical behavior. A map could still be a useful secondary view later for:

- where major ores are mined
- where elements were first isolated or discovered
- where strategic supply chains are concentrated

## Rebuild the data bundle

Run:

```bash
curl -Lsf https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json | python3 periodic-table-explorer/scripts/build_periodic_data.py
```

The generator writes:

- [`data/periodic-table-data.js`](./data/periodic-table-data.js)

## Data source and attribution

- Base data source: [Bowserinator/Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON)
- The app uses bundled summary text carried through that dataset; keep attribution in place if you publish or redistribute this build.
- The shell visual in the lesson card is generated locally from the electron-shell counts in the bundled data.
