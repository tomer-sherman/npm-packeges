import colors, { Color } from "colors";
import { ClientError } from "./models/client-error";
import { StatusCode } from "./models/enum";



const reds: Color[] = [
    colors.red,
    colors.red.bold,
    colors.red.dim,
    colors.red.italic,
    colors.red.underline,
    colors.red.inverse,
    colors.bgRed,
    colors.bgRed.bold,
];

const messageColor: Color = colors.red.bold;

const errorNums: number[] = [
    400,
    401,
    403,
    404,
    409,
    422,
    429,
    500
]

const combined = reds.map((red, index) => ({
    red: red,
    errorNum: errorNums[index]
}))




class ErrorColorLogger {


    public logError(clientError: ClientError): void {

        const message = clientError.message;

        const errorNum = +clientError.status;
        const colorObj = combined.find(color => color.errorNum === errorNum);
        const color = colorObj?.red;

        console.log(color!("Status code: "+ errorNum.toLocaleString()), "||", messageColor("Error message: " + message));


    }


}

export const errorColorLogger = new ErrorColorLogger();



