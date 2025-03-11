import axios, { AxiosRequestConfig } from "axios";
import { Fetcher } from "./Fetcher";

export class HttpFetcher implements Fetcher {
  private readonly config: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig = {}) {
    this.config = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        ...config.headers,
      },
      timeout: 30000,
      ...config,
    };
  }

  public async fetch(url: string): Promise<string> {
    const response = await axios.get(url, this.config);
    return response.data;
  }
}
