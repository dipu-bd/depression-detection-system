// To find the next question

import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Questions } from '/imports/api/questions';
import { Sessions } from '/imports/api/sessions';

export function getNextQuestion(session) {

    // build search parameters
    const type = (current.type || 0);
    const src = {
        type: type + 1,
    };
    const sort = {
        createdAt: -1
    };
    console.log(src);

    // send next question
    const ques = Questions.finOne(src, { sort });
    return Match.test(ques, Object) ? ques : false;

}