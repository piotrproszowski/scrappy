export interface Parser<T = any> {
  parse(content: string): T;
}
