import figlet from "figlet";
import { color } from "console-color-logger";


class Art {

    public printCurrentTime(colorName: string = "yellow") {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const text = figlet.textSync(time);
        this.printInColor(text, colorName);
    }

    public printCurrentDate(colorName: string = "yellow") {
        const now = new Date();
        const time = now.toLocaleDateString();
        const text = figlet.textSync(time);
        this.printInColor(text, colorName);
    }

    public printCurrentDateTime(colorName: string = "yellow") {
        const now = new Date();
        const time = now.toLocaleString();
        const text = figlet.textSync(time);
        this.printInColor(text, colorName);
    }


    public getVersion(colorName: string = "yellow") {
        // resolved at runtime relative to build/art.js, so ../package.json is the project root
        const packageJson = require("../package.json");
        const text = figlet.textSync(packageJson.name + " v" + packageJson.version);
        this.printInColor(text, colorName);
    }

    private printInColor(text: string, colorName: string) {
        const paint = (color as any)[colorName];
        if (typeof paint === "function") {
            paint(text);
        } else {
            color.yellow(text); // unknown color name falls back to the default
        }
    }

}

export const art = new Art();