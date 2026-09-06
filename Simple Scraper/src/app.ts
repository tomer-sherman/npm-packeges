import axios from "axios"
import * as cheerio from "cheerio";
import { MetaDataModel } from "./models/meta-data-model";
import { ScrapedPageModel } from "./models/scraped-page-model";


class Scraper {

    public async getHtml(url: string): Promise<string> {

        const response = await axios.get<string>(url);
        const html = response.data;
        return html;

    }

    public getHttpsLinks(fullHtml: string): string[] {

        const urls = fullHtml.match(/https?:\/\/[^\s"'<>]+/g) ?? [];
        const unique = [...new Set(urls)];
        unique.forEach(u => console.log(u));
        return unique;
    }

    public getHeaders(fullHtml: string): string[] {

        // Loads the var with a special cheerio type.
        const $ = cheerio.load(fullHtml);

        // maps what was loaded, in the first var, With an empty index at first, and the second represent element,
        // it takes each el, in this case each header, converts it to text, trims it, Then get() warps it up in a way that returns to headers a string array.
        const headers = $("h3").map((_, el) => $(el).text().trim()).get()

        // Simple console log for each, header which sits inside this array.
        headers.forEach(h => console.log(h));

        return headers;

    };

    public getMeta(fullHtml: string): MetaDataModel {

        const $ = cheerio.load(fullHtml);

        const metaData = {
            title: $("title").text().trim(),
            description: $('meta[name="description"]').attr("content"),
            published: $('meta[property="article:published_time"]').attr("content"),
            author: $('meta[name="author"]').attr("content"),
            canonical: $('link[rel="canonical"]').attr("href"),
        }

        console.log(metaData);

        return metaData;
    };

    public getArticleText(fullHtml: string): string[] {

        const $ = cheerio.load(fullHtml);

        const pElements = $("p").map((_, el) => $(el).text().trim()).get();

        pElements.forEach(p => console.log(p));

        return pElements;

    };


    public async getScrapedHtml(url: string): Promise<ScrapedPageModel> {

        const html = await this.getHtml(url);

        return {
            url,
            meta: this.getMeta(html),
            headers: this.getHeaders(html),
            paragraphs: this.getArticleText(html),
            links: this.getHttpsLinks(html)
        };

    }



}

export const scraper = new Scraper();