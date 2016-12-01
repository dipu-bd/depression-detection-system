// Definition of the session collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SessionSchema } from './schema.js'
 
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

Sessions.helpers({
    isCompleted() {
        return this.completed;
    }, 
    score() {
        let tot = 0;
        this.choice.forEach((option) => tot += option.score);
        return tot;
    },

});
