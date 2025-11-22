# Local Fonts

Place your local font files (e.g., `.woff2`, `.ttf`) in this directory.

You can then load them in `lib/fonts.ts` using `localFont` from
`next/font/local`.

## Example Usage

\`\`\`ts import localFont from 'next/font/local'

export const myCustomFont = localFont({ src:
'../public/assets/fonts/my-font.woff2', variable: '--font-custom', })
