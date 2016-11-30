// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/questions/questions.js';
import { BeckDepressionInventory } from '../../api/questions/data.js';

Meteor.startup(() => {
  // if the collection is empty
  if (Questions.find().count() === 0) {
    BeckDepressionInventory.forEach(function (ques) {
      Questions.insert(ques);
    });
  }
});
