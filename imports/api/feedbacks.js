// Definition of the session collection
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { FeedbackSchema } from '../schema/feedbacks'

export const Feedbacks = new Mongo.Collection('feedbacks');

Feedbacks.schema = FeedbackSchema;
Feedbacks.attachSchema(Feedbacks.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Feedbacks.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
