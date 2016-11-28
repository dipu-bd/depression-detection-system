// Definition of the questions collection

import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'; 

export const Questions = new Mongo.Collection('questions');

// Deny all client-side updates since we will be using methods to manage this collection
Questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Questions.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  }, 
  desc: {
    type: String,
    max: 100,
    optional: true,
  },
  createdAt: {
    type: Date,
    denyUpdate: true, 
  },  
});

Questions.attachSchema(Questions.schema);
  
/*
Todos.helpers({
  list() {
    return Lists.findOne(this.listId);
  },
  editableBy(userId) {
    return this.list().editableBy(userId);
  },
});
*/