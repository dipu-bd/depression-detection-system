// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/questions';
import { BeckDepressionInventory } from './bdi';

Meteor.startup(() => {
	// if the collection is empty
	if (Questions.find().count() === 0) {
		BeckDepressionInventory.forEach(function (ques) { 
			Questions.insert(ques);
		});
	}
});
