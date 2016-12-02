// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { check } from "meteor/check";
import { Sessions } from './sessions';
import { Questions } from './questions';

Meteor.publish('questions.all', function () {
    return Questions.find();
});   

Meteor.publish('sessions.user', function (_id) {
    check(_id, String);
    const res = Sessions.find({ _id });
    if (res.count() === 1) {
        return res;
    }
    Meteor.Error("No session found");
    return false;
});   
