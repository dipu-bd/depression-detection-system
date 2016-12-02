// Methods related to questions

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questions } from './questions';
import { Sessions } from './sessions';

Meteor.methods({

    'sessions.insert'(doc) {
        check(doc, Sessions.schema);
        return Sessions.insert(doc);
    },

    'questions.next'(_id) {
        // get session
        check(_id, String);
        const session = Sessions.findOne({ _id });
        check(session, Object);
        if (session.checked < session.questions.length) { 
            return true;
        }

        // build search parameters
        const src = {
            type: session.checked + 1,
        };
        console.log(src);

        // find first result, and add it to current session
        const ques = Questions.findOne(src);
        check(ques, Object);
        Sessions.update({ _id }, { $push: { questions: ques } });
        return true;
    },
});