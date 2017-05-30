// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { check } from "meteor/check";
import { Sessions } from './sessions';
import { Statistics } from './statistics';
import { Questions } from './questions';
import { Choices } from './choices';

Meteor.publish('questions.all', function () {
    return Questions.find();
});

Meteor.publish('choices.user', function (session) {
    check(session, String);
    return Choices.find({ session });
});

Meteor.publish('sessions.user', function (_id) {
    check(_id, String);
    const res = Sessions.find({ _id });
    if (res && res.count() === 1) {
        return res;
    }
    throw new Meteor.Error("No session was found");
});

Meteor.publish('choices.all', function () {
    return Choices.find();
});

Meteor.publish('sessions.all', function () {
    return Sessions.find();
});

Meteor.publish('stats.users', function (scale, category) {
    check(scale, String);
    check(category, Number);

    let users = [];
    let data = Statistics.find({
        scale,
        category
    }).forEach((stat)=> {
        users.push(stat.session);
    });
    
    return Sessions.find({
        "_id": { "$in": users }
    });
});

