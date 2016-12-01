// All questions-related publications

import { Meteor } from 'meteor/meteor';
import { Session } from './sessions.js';

Meteor.publish('session.user', function (id) { 
    return Session.find(id);
});   