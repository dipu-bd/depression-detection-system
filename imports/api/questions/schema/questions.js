// Definition of Questions schema

import { SimpleSchema } from 'meteor/aldeed:simple-schema'; 
import { OptionsSchema } from './options'

// schema for each question
export const QuestionsSchema = new SimpleSchema({ 
  
  type: {
    type: Number, 
    defaultValue: 0,   
  },
  title: {
    type: String, 
    max: 100,
  },
  desc: {
    type: String,
    label: "Description",
    defaultValue: "Choose an option.",
  },
  options: {
    type: [OptionsSchema], 
    minCount: 2,
  },

  // auto-managed properties
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
  },
});