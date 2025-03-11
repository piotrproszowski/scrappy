export interface Extractor<T> {
  extract(parsedContent: any): Promise<T> | T;
}
