import {
  Scraper,
  HttpFetcher,
  CachedFetcher,
  CheerioParser,
  NewsExtractor,
  JsonStorage,
  NewsArticle,
} from "./src";

async function main() {
  const defaultUrl = "https://przykladowa-strona.pl/artykul/123";
  const url = process.argv[2] || defaultUrl;
  const outputDir = "./wyniki";

  const fetcher = new CachedFetcher(new HttpFetcher());
  const parser = new CheerioParser();
  const extractor = new NewsExtractor();
  const storage = new JsonStorage(outputDir);

  const scraper = new Scraper<NewsArticle>(fetcher, parser, extractor, storage);

  try {
    console.log(`Rozpoczynam pobieranie danych z ${url}...`);
    const result = await scraper.scrape(url);

    console.log("Pobrane dane:");
    console.log(JSON.stringify(result.data, null, 2));
    console.log(`Dane zostały zapisane do katalogu: ${outputDir}`);
  } catch (error) {
    console.error("Wystąpił błąd podczas scrapowania:", error);
  }
}

if (require.main === module) {
  if (process.argv.length < 3) {
    console.log("Użycie: ts-node start.ts [URL]");
    console.log("Przykład: ts-node start.ts https://start.com/article/123");
    console.log("Jeśli nie podasz URL, zostanie użyty domyślny przykład.");
  }
  main().catch(console.error);
}
