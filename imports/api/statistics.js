// Definition of the statistics collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { StatisticsSchema } from '../schema/statistics'

export const Statistics = new Mongo.Collection('statistics');

Statistics.schema = StatisticsSchema;
Statistics.attachSchema(Statistics.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Statistics.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

