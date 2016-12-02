// Definition of Questions schema

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { OptionSchema } from './options'

// schema for each question
export const QuestionSchema = new SimpleSchema({ 
	type: {
		type: Number,
		defaultValue: 0,
	},
	title: {
		type: String,
		max: 100,
	},
	desc: {
		type: String,
		label: "Description",
		defaultValue: "Choose an option.",
	},
	options: {
		type: [OptionSchema],
		minCount: 2,
	},

	// auto-managed properties
	createdAt: {
		type: Date,
		autoValue: function () {
			if (this.isUpsert) {
				return { $setOnInsert: new Date() };
			} else {
				return new Date();
			}
		},
	},
	updatedAt: {
		type: Date,
		autoValue: function () {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true,
	},
});