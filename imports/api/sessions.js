// Definition of the session collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SessionSchema } from '../schema/sessions'

export const Sessions = new Mongo.Collection('sessions');

Sessions.schema = SessionSchema;
Sessions.attachSchema(Sessions.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Sessions.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});


Sessions.questions = (session) => {
    if (Match.test(session, String)) {
        session = Sessions.findOne({ _id: session });
    }
    if (!Match.test(session, Object)) {
        throw new Meteor.Error("Session is not valid");
    }
    let quesList = [];
    session.choices.forEach((choice) => {
        quesList.push(choice.ques);
    });
    return Questions.find({ _id: { $in: quesList } }, { sort: { type: 1 } });
};

Session.choosen = (session, ques) => {

};