// Definition of the session collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

//import { SessionSchema } from '../schema/sessions'

export const Choices = new Mongo.Collection('choices');

//Sessions.schema = SessionSchema;
//Sessions.attachSchema(Sessions.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Choices.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
