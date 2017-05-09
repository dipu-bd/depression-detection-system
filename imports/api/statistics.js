// Definition of the statistics collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Messages } from '../lib/messages';
import { Sessions } from './sessions';
import { _ } from 'meteor/erasaur:meteor-lodash';

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

Statistics.calculate = function (session) {
    const message = new Messages(session._id);
    // scales are one of: ['anxiety', 'depression', 'hopeless', 'suicide']
    Statistics.insert({
        scale: 'anxiety',
        score: message.total,
        category: message.basCategory(),
        batch: session.batch,
        session: session._id,
    });
    Statistics.insert({
        scale: 'depression',
        score: message.total,
        category: message.bdsCategory(),
        batch: session.batch,
        session: session._id,
    });
    Statistics.insert({
        scale: 'hopeless',
        score: message.bhsScore(),
        category: message.bhsCategory(),
        batch: session.batch,
        session: session._id,
    });
    Statistics.insert({
        scale: 'suicide',
        score: message.bssScore(),
        category: message.bssCategory(),
        batch: session.batch,
        session: session._id,
    });
    // update session
    return Sessions.update({ _id: session._id }, {
        "$set": { "statistics": true }
    });
};

Statistics.generate = function(scale, batch) {  
    // build query options
    let options = { };
    options.scale = scale;
    if(batch) options.batch = batch;
    // group by the categories
    let group = {};
    Statistics.find(options).forEach((stat)=> {
        if(!group[stat.category]) {
            group[stat.category] = 1;
        } else {
            group[stat.category]++;
        }
    });
    // calculate result
    let result = [];
    Object.keys(group).forEach((key) => {
        result.push({ 
            count: group[key],
            category: key
        });
    });
    // sort by categories and return
    return _.sortBy(result, "cateogry");
}

