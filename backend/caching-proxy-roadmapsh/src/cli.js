import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { manageOptions } from "./actions.js";
import { argvExist } from "./validator.js";

yargs(hideBin(process.argv))
    .command("help", "Show help", {}, () => {
        yargs.showHelp();
    })
    .command("*", "Parse the options", {
    }, (argv) => {
        manageOptions(argv);
    }).options({
        port: {
            alias:"p",
            type: "number",
            description: "The port to listen on"
        },
        origin: {
            alias: "o",
            type: "string",
            description: "The origin to allow requests from"
        },
        "clear-cache": {
            type: "boolean",
            description: "Clear the cache before starting the server",
        }
    }).check((argv) => {
        const hasPort = argvExist(argv.port);
        const hasOrigin = argvExist(argv.origin);
        const hasClearCache = argvExist(argv["clear-cache"]);
        if (!hasPort && !hasOrigin && !hasClearCache) {
            throw new Error("You must provide at least one option");
        }
        if (hasClearCache && (hasPort || hasOrigin)) {
            throw new Error("You can't provide options with --clear-cache");
        }
        if ((!hasPort && hasOrigin) || (hasPort && !hasOrigin)) {
            throw new Error("You must provide both --port and --origin");
        }

        return true;
        
    }).parse();
