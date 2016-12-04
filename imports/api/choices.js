// Definition of the session collection

import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { ChoiceSchema } from '../schema/choice'

export const Choices = new Mongo.Collection('choices');

Choices.schema = ChoiceSchema;
Choices.attachSchema(Choices.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Choices.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Choices.questions = (session, quesList) => {
    check(session, String);
    quesList = quesList || [];
    Choices.find({ session }).forEach((choice) => {
        quesList.push(choice.question);
    });
    return quesList;
};

Choices.allChoices = (session) => {
    check(session, String);
    let choiceList = {};
    Choices.find({ session }).forEach((choice) => {
        choiceList[choice.question] = choice.option;
    });
    return choiceList;
};