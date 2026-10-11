# Japanese width converter

A small browser-only tool for full-width and half-width Japanese text. Both outputs update as you type, with a copy button for each. Text is held in memory in the current tab; it is never sent to a server or saved to storage.

Converts katakana, Japanese punctuation, ASCII letters, numbers, punctuation, and ordinary spaces. Kanji, hiragana, emoji, line breaks, and tabs are preserved. Characters without a half-width equivalent remain unchanged. Conversion uses [moji](https://github.com/niwaringo/moji), with narrowly scoped Unicode normalization for voiced kana.

## Development

Node.js 24 and pnpm 10 are used by the deployment workflow.

```sh
pnpm install
pnpm dev
```

```sh
pnpm test
pnpm lint
pnpm build
```

The build writes static HTML, CSS, and JavaScript to `out/`. No Node.js server is needed to host it. The UI uses system fonts and bundled dependencies, with no external runtime requests.

## GitHub Pages

1. In the repository's **Settings > Pages**, set **Source** to **GitHub Actions**.
2. Push to `main`, or run **Deploy to GitHub Pages** from the Actions tab.
3. The workflow tests, builds, and publishes `out/`. It gets the base path from GitHub, so repository URLs and custom domains use the right asset paths.

For this repository, the default Pages URL is `https://zawmintheindev.github.io/japaneseFullWidthConverter/`.

To build manually for that subdirectory:

```sh
PAGES_BASE_PATH=/japaneseFullWidthConverter pnpm build
```

For a custom domain or a root-level site, run `pnpm build` without a base path. Publish the complete contents of `out/`, including `.nojekyll`.
