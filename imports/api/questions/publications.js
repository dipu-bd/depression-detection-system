// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { Questions } from './questions.js';

Meteor.publish('questions.bdi', function () {
    return Questions.find({
        $and: [
            { type: { $gte: 1 } },
            { type: { $lte: 21 } },
        ],
    });
});
