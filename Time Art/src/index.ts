#!/usr/bin/env node

// this is a line that tells the system to use, node to run the code

import { art } from "./art";


// User writes on the console:
//art time red
//process.argv[2] gives the string "time", process.argv[3] gives the optional color
const input = process.argv[2];

const value = input?.toLocaleLowerCase() || "";
const colorName = process.argv[3]?.toLocaleLowerCase() || "yellow";

switch (value) {
    case "date": art.printCurrentDate(colorName);
        break
    case "time": art.printCurrentTime(colorName);
        break
    case "now": art.printCurrentDateTime(colorName);
        break
    case "--version": art.getVersion(colorName);
        break
    case "-v": art.getVersion(colorName);
        break
    default:
        console.log("Wrong usage! Please read the help page in npm... ");
}




