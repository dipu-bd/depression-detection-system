// Definition of the statistics collection

import { Mongo } from 'meteor/mongo';  
import { SimpleSchema } from 'meteor/aldeed:simple-schema'; 

import { StatsSchema } from './schema.js'

export const Stats = new Mongo.Collection('stats');
 
Stats.schema = StatsSchema;
Stats.attachSchema(Stats.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Stats.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
}); 
  
Stats.helpers({
    isCompleted() {
        return this.completed; 
    },
    score() {
        let tot = 0;
        this.choice.forEach( (option) => tot += option.score );
        return tot;
    },
  
});
