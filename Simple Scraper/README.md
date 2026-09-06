# simple-url-scraper

Give it a URL, get back its headers, paragraphs, links, and meta data. Built on [axios](https://www.npmjs.com/package/axios) for fetching and [cheerio](https://www.npmjs.com/package/cheerio) for parsing.

## Install

```bash
npm install simple-url-scraper
```

## Usage

```ts
import { scraper } from "simple-url-scraper";

const data = await scraper.getScrapedHtml("https://example.com");
console.log(data);
```

`data` matches the `ScrapedPageModel` shape:

```ts
{
  url: string;
  meta: {
    title: string;
    description: string | undefined;
    published: string | undefined;
    author: string | undefined;
    canonical: string | undefined;
  };
  headers: string[];   // text of every <h3> on the page
  paragraphs: string[]; // text of every <p> on the page
  links: string[];      // unique https:// links found in the page
}
```

## API

`scraper` exposes:

- `getHtml(url: string): Promise<string>` — fetches the raw HTML for a URL.
- `getScrapedHtml(url: string): Promise<ScrapedPageModel>` — fetches a URL and returns headers, paragraphs, links, and meta data together.
- `getHeaders(html: string): string[]` — extracts `<h3>` text from HTML you already have.
- `getArticleText(html: string): string[]` — extracts `<p>` text from HTML you already have.
- `getHttpsLinks(html: string): string[]` — extracts unique `https://` links from HTML you already have.
- `getMeta(html: string): MetaDataModel` — extracts title/description/author/published/canonical meta data from HTML you already have.

## Local development

This repo includes a test script (`src/test/test.ts`) and an `fs-helper` used only to save scraped output to disk while developing — neither is part of the published package or its public API.

```bash
npm run build   # compile to build/
npm test        # run the test script against a sample URL
```

## License

MIT
