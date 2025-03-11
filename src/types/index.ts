export enum ScraperState {
  IDLE = "idle",
  FETCHING = "fetching",
  PARSING = "parsing",
  EXTRACTING = "extracting",
  STORING = "storing",
  COMPLETED = "completed",
  ERROR = "error",
}

export interface ScraperResult<T> {
  data: T;
  url: string;
  timestamp: Date;
}

export interface ScraperConfig {
  url: string;
  selector: string;
  interval: number;
}
