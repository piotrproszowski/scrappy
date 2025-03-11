import { ScraperState, ScraperResult } from "./types";
import { Fetcher } from "./fetchers/Fetcher";
import { Parser } from "./parsers/Parser";
import { Extractor } from "./extractors/Extractor";
import { Storage } from "./storage/Storage";

export class Scraper<T> {
  private state: ScraperState = ScraperState.IDLE;
  private error: Error | null = null;

  constructor(
    private readonly fetcher: Fetcher,
    private readonly parser: Parser,
    private readonly extractor: Extractor<T>,
    private readonly storage: Storage,
  ) {}

  public getState(): ScraperState {
    return this.state;
  }

  public getError(): Error | null {
    return this.error;
  }

  public async scrape(url: string): Promise<ScraperResult<T>> {
    try {
      this.state = ScraperState.FETCHING;
      const htmlContent = await this.fetcher.fetch(url);

      this.state = ScraperState.PARSING;
      const parsedContent = this.parser.parse(htmlContent);

      this.state = ScraperState.EXTRACTING;
      const extractedData = await this.extractor.extract(parsedContent);

      this.state = ScraperState.STORING;
      const result: ScraperResult<T> = {
        data: extractedData,
        url,
        timestamp: new Date(),
      };

      await this.storage.save(result);
      this.state = ScraperState.COMPLETED;

      return result;
    } catch (error) {
      this.state = ScraperState.ERROR;
      this.error = error instanceof Error ? error : new Error(String(error));
      throw this.error;
    }
  }
}
