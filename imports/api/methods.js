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
        check(_id, String);

        const session = Sessions.findOne({ _id });
        check(session, Sessions.schema);

        // build search parameters
        const src = {
            type: session.questions.count() + 1,
        };

        // send first result
        const ques = Questions.findOne(src);
        check(ques, Questions.schema);

        // add it to current session
        Sessions.update({ _id }, { $push: { questions: ques } });
        return this.ready();
    },
});