# Modular Web Scraper

A flexible, extensible web scraping framework built with TypeScript and Node.js that follows clean code principles and modular design.

## Features

- 🧩 **Modular Architecture**: Easily swap components for different scraping strategies
- 🔄 **Type-Safe**: Built with TypeScript for robust type checking
- 🚀 **Performance Optimized**: Includes caching mechanisms to avoid redundant requests
- 💾 **Multiple Storage Options**: Export data to JSON, CSV, or extend to databases
- 🔧 **Customizable Extractors**: Create specialized extractors for different content types
- 🖥️ **CLI Support**: Run scraper with custom URLs via command line

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/modular-web-scraper.git
cd modular-web-scraper

# Install dependencies
npm install

# Build the project
npm run build
```

## Quick Start

### Using the Scraper from Command Line

```bash
# Run with a specific URL
ts-node example.ts https://example.com/article/123

# Run with default URL if none is provided
ts-node example.ts
```

### Code Example

```typescript
import {
  Scraper,
  HttpFetcher,
  CachedFetcher,
  CheerioParser,
  NewsExtractor,
  JsonStorage,
} from "./src";

async function main() {
  // Get URL from command-line arguments or use default
  const url = process.argv[2] || "https://example.com/article/123";
  const outputDir = "./results";

  // Create components
  const fetcher = new CachedFetcher(new HttpFetcher());
  const parser = new CheerioParser();
  const extractor = new NewsExtractor();
  const storage = new JsonStorage(outputDir);

  // Create scraper
  const scraper = new Scraper(fetcher, parser, extractor, storage);

  // Execute scrape
  try {
    console.log(`Starting to scrape data from ${url}...`);
    const result = await scraper.scrape(url);
    console.log("Scraping complete:", result.data);
  } catch (error) {
    console.error("Scraping failed:", error);
  }
}

main();
```

## Architecture

The scraper is built around four main components:

1. **Fetcher**: Retrieves HTML content from web pages

   - `HttpFetcher`: Basic HTTP fetching with axios
   - `CachedFetcher`: Caches responses to improve performance

2. **Parser**: Transforms HTML into a structured format

   - `CheerioParser`: Uses Cheerio (jQuery-like) for HTML parsing

3. **Extractor**: Extracts specific data from parsed content

   - `NewsExtractor`: Extracts news article content (title, text, date, author)

4. **Storage**: Persists the extracted data
   - `JsonStorage`: Saves data as JSON files
   - `CsvStorage`: Exports data as CSV files

## Extending the Scraper

### Creating a Custom Extractor

```typescript
import { Extractor } from "./src/extractors";
import * as cheerio from "cheerio";

interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export class ProductExtractor implements Extractor<Product> {
  public extract($: cheerio.CheerioAPI): Product {
    return {
      name: $(".product-name").text().trim(),
      price: parseFloat($(".product-price").text().replace("$", "")),
      description: $(".product-description").text().trim(),
      imageUrl: $(".product-image").attr("src") || "",
    };
  }
}
```

## License

MIT
