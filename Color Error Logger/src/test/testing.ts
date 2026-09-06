import { errorColorLogger } from "../color";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enum";

(() => {



    try {
        if (Math.random() > 0.0000000000000000001) { throw new ClientError(StatusCode.Conflict, "An error message..."); }
        console.log("TESTING WORKED!!!");
    } catch (clientError: any) {

        errorColorLogger.logError(clientError);

    }



})();