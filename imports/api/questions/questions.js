// Definition of the questions collection

import { Mongo } from 'meteor/mongo';  
import { SimpleSchema } from 'meteor/aldeed:simple-schema'; 

import { QuestionSchema } from './schema/questions'

export const Questions = new Mongo.Collection('questions');
 
Questions.schema = QuestionSchema;
Questions.attachSchema(Questions.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
}); 
  
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