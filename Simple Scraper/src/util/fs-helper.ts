import path from "node:path";
import fs from "node:fs";


class FsHelper {

    public saveScrapedDataAsJson(fileName: string, content: string, folderPath: string): string {

        // these 2 vars are the stringfied file and folder paths, for the file we want to add 
        const frPath = folderPath;// path.join(__dirname, ......,.....) dir name refers to where in what directory the code was activated, 
        const fePath = path.join(frPath, fileName); // this simply combines, the 2


      
        if (!fs.existsSync(frPath)) { 
            fs.mkdirSync(frPath, { recursive: true }) 
        }

        fs.writeFileSync(fePath, content);

        return fePath;
    }





    



}

export const fsHelper = new FsHelper();

