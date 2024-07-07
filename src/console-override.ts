import * as Colors from "https://deno.land/std@0.182.0/fmt/colors.ts";
import { debugFlag } from "./index.ts";

export function overrideConsole() {
    console.debug = function (txt) {
        if (debugFlag) {
            console.log(Colors.gray(`[DEBUG]: ${txt} `));
        }
    };
    console.error = function (txt) {
        console.log(Colors.red(`[ERROR]: ${txt} `));
    };
    console.info = function (txt) {
        console.log(Colors.blue(`[INFO]: ${txt} `));
    };
}
