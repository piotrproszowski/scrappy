import { ScraperResult } from "../types";

export interface Storage {
  save<T>(data: ScraperResult<T>): Promise<void>;
}
