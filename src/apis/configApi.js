import {systemConfigsUrl} from "./httpRequest";
import {getPromise} from "./api";

export default {
    getSystemAuthTree() {
        return getPromise(systemConfigsUrl, 1, 1000);
    }
}

