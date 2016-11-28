// Definition of Questions schema

import { SimpleSchema } from 'meteor/aldeed:simple-schema'; 
import { OptionsSchema } from './options'

// schema for each question
export const QuestionsSchema = new SimpleSchema({ 
  "type": {
    type: Number, 
    defaultValue: 0,   
  },
  title: {
    type: String, 
    optional: true,
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
  createdAt: {
    type: Date,
    denyUpdate: true,
    defaultValue: function() {
        return new Date();
    }, 
  },  
});