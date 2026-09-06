import path from "node:path";
import { scraper } from "../app";
import { fsHelper } from "../util/fs-helper";


(async () => {


    try {
        const url = "https://www.walla.co.il/";

        const data = await scraper.getScrapedHtml(url);

        const content = JSON.stringify(data, null, 2);

        const folderPath = path.join(__dirname, "..", "..", "ScrapedDataa");
        fsHelper.saveScrapedDataAsJson("scrapedWalla", content, folderPath);


    } catch (err: any) {
        console.log(err);
    }

})();