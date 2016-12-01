// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { Session } from './session.js';

Meteor.publish('session.user', function (id) { 
    return Session.find(id);
});   