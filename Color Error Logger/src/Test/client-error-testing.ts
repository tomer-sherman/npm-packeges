import { logError } from "../error-log";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enum";

(() => {

    try {
        throw new ClientError(StatusCode.BadRequest, " Why not?");
    }
    catch (err: any) {
        logError(err);
    }



})();