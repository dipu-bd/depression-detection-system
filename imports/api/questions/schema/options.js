// Definition of OptionsSchema 

import { SimpleSchema } from 'meteor/aldeed:simple-schema'; 

// schema for options used in each questions
export const OptionsSchema = new SimpleSchema({
  title: {
    type: String, 
    optional: true,
  },
  score: {
    type: Number, 
  },
  desc: {
    type: String,
    label: "Description",
  }
});