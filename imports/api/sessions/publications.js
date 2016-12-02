// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { check } from "meteor/check";
import { Sessions } from './sessions.js';

Meteor.publish('sessions.user', function (id) {
    console.log("OKA", id);
    check(id, String);
    const res = Sessions.find({ _id: id });
    if (res.count() === 0) {
        Meteor.Error("Session was not found");
    }
    return res;
});   