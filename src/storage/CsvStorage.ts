import * as fs from "fs/promises";
import * as path from "path";
import { Storage } from "./Storage";
import { ScraperResult } from "../types";
import { createObjectCsvWriter } from "csv-writer";

export class CsvStorage implements Storage {
  constructor(private readonly outputDir: string) {}

  public async save<T>(result: ScraperResult<T>): Promise<void> {
    await fs.mkdir(this.outputDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const filename = `scrape-result-${timestamp}.csv`;
    const filePath = path.join(this.outputDir, filename);

    const flatData = this.flattenObject(result.data);
    flatData.url = result.url;
    flatData.timestamp = result.timestamp.toISOString();

    const headers = Object.keys(flatData).map((key) => ({
      id: key,
      title: key,
    }));

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: headers,
    });

    await csvWriter.writeRecords([flatData]);
  }

  private flattenObject(obj: any, prefix: string = ""): Record<string, string> {
    const result: Record<string, string> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          Object.assign(result, this.flattenObject(value, newKey));
        } else {
          result[newKey] = String(value);
        }
      }
    }

    return result;
  }
}
