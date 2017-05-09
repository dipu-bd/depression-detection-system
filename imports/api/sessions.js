// Definition of the session collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { SessionSchema } from '../schema/sessions'

export const Sessions = new Mongo.Collection('sessions');

Sessions.schema = SessionSchema;
Sessions.attachSchema(Sessions.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Sessions.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Sessions.numbers = (batch) => {	
	// count total
	let options = {};
	if(batch) options.batch = batch;	
	const total = Sessions.find(options).count();
	// count finished
	options.finished = { $ne: false };
	const completed = Sessions.find(options).count();
	// return data
	return { total, completed };
};
