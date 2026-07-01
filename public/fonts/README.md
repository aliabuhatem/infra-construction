# Site fonts (self-hosted)

Place the Myriad Pro web-font files in this folder with these **exact** names:

| File | Weight | Used for |
|------|--------|----------|
| `MyriadPro-Regular.woff2`  | 400 | body / paragraph text |
| `MyriadPro-Bold.woff2`     | 700 | headings / emphasis |
| `MyriadPro-Semibold.woff2` | 600 | *optional* — enable the commented block in `app/globals.css` |

They are loaded by the `@font-face` rules in `app/globals.css` and served at
`/fonts/MyriadPro-*.woff2`.

> ⚠️ **Myriad Pro is a licensed Adobe font and is NOT included in this repo.**
> Until you add these files, the site falls back to **Segoe UI → system-ui**
> (see `--font-myriad` in `app/globals.css`). Only add font files you're
> licensed to self-host.
