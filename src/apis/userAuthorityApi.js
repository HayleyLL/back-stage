import axios from "axios";
import {userAuthoritiesUrl} from "./httpRequest";
import {getPromise} from "./api";

export default {
    updateUserAuthorities(userId, authCodes) {
        return axios({
            method: "put",
            url: userAuthoritiesUrl.replace(":userId", userId),
            data: {
                authorityCodes: authCodes
            },
            headers: {Authorization: localStorage.getItem("token")},
        })
    },

    getUserAuthorities(userId) {
        const url = userAuthoritiesUrl.replace(":userId", userId);
        return getPromise(url);
    }
}


