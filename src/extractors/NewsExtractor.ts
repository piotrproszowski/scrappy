import * as cheerio from "cheerio";
import { Extractor } from "./Extractor";

export interface NewsArticle {
  title: string;
  content: string;
  publicationDate: string;
  author: string;
}

export class NewsExtractor implements Extractor<NewsArticle> {
  public extract($: cheerio.CheerioAPI): NewsArticle {
    return {
      title: this.extractTitle($),
      content: this.extractContent($),
      publicationDate: this.extractDate($),
      author: this.extractAuthor($),
    };
  }

  private extractTitle($: cheerio.CheerioAPI): string {
    const titleElement = $("h1");
    return titleElement.text().trim();
  }

  private extractContent($: cheerio.CheerioAPI): string {
    const contentElement = $(".article-content");
    return contentElement.text().trim();
  }

  private extractDate($: cheerio.CheerioAPI): string {
    const dateElement = $("span.date");
    return dateElement.text().trim();
  }

  private extractAuthor($: cheerio.CheerioAPI): string {
    const authorElement = $("span.author");
    return authorElement.text().trim();
  }
}
