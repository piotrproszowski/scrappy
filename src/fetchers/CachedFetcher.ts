import { Fetcher } from "./Fetcher";

export class CachedFetcher implements Fetcher {
  private cache: Map<string, string> = new Map();

  constructor(private readonly baseFetcher: Fetcher) {}

  public async fetch(url: string): Promise<string> {
    const cachedContent = this.cache.get(url);

    if (cachedContent) {
      return cachedContent;
    }

    const content = await this.baseFetcher.fetch(url);
    this.cache.set(url, content);

    return content;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public removeCacheItem(url: string): boolean {
    return this.cache.delete(url);
  }
}
