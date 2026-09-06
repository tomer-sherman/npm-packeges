import { MetaDataModel } from "./meta-data-model"

export type ScrapedPageModel = {
url: string,
meta: MetaDataModel,
headers: string[],
paragraphs: string[],
links: string[]
}