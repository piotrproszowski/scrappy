import * as cheerio from "cheerio";
import { Parser } from "./Parser";

export class CheerioParser implements Parser<cheerio.CheerioAPI> {
  public parse(content: string): cheerio.CheerioAPI {
    return cheerio.load(content);
  }
}
