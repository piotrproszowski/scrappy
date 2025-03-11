import * as fs from "fs/promises";
import * as path from "path";
import { Storage } from "./Storage";
import { ScraperResult } from "../types";

export class JsonStorage implements Storage {
  constructor(private readonly outputDir: string) {}

  public async save<T>(result: ScraperResult<T>): Promise<void> {
    await fs.mkdir(this.outputDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const filename = `scrape-result-${timestamp}.json`;
    const filePath = path.join(this.outputDir, filename);

    await fs.writeFile(filePath, JSON.stringify(result, null, 2), {
      encoding: "utf-8",
    });
  }
}
