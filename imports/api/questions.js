// Definition of the questions collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { QuestionSchema } from '../schema/questions'

export const Questions = new Mongo.Collection('questions');

Questions.schema = QuestionSchema;
Questions.attachSchema(Questions.schema);

// Deny all client-side updates since we will be using methods
// to manage this collection
Questions.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

// some global functions
Questions.maxType = () => {
    return 21;
};

Questions.minType = () => {
    return 1;
};

Questions.getType = (_id) => {
    const ques = Questions.findOne({ _id });
    return ques ? ques.type : 0;
};

Questions.isLast = (_id) => {
    return Questions.getType(_id) === Questions.maxType();
};

Questions.optionDetails = (choices) => {
    const optionList = [];
    const quesList = Object.keys(choices);
    Questions.find({ _id: { $in: quesList } }).forEach((ques) => { 
        let option = ques.options[choices[ques._id]];
        option.question = {
            _id: ques._id,
            type: ques.type,
            title: ques.title,
            desc: ques.desc,
        }
        optionList.push(option);
    });
    return optionList;
};