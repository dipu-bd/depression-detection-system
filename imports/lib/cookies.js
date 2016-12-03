// To manage browser cookies from client side 

import { Match } from 'meteor/check';
import { Cookie } from 'meteor/chuangbo:cookie';

export const SessionCookie = {
    get() {
        const user = Cookie.get("session");
        if (Match.test(user, String)) {
            return user;
        }
        return null;
    },
    set(id) {
        if (this.get() === id) {
            return false;
        }
        Cookie.set("session", id, {
            path: "/",
            expires: 30, // in days
        });
        return true;
    },
    remove() {
        Cookie.remove("session", {
            path: '/'
        });
    },
};

