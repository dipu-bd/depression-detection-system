// Methods related to questions

import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Questions } from './questions';
import { Sessions } from './sessions';

import { getNextQuestion } from '/imports/lib/findQues.js';

Meteor.methods({

    'sessions.insert'(doc) {
        check(doc, Sessions.schema);
        return Sessions.insert(doc);
    },

    'session.setChoice'(sessionId, quesId, optionId) {
        // get session
        check(sessionId, String);
        const session = Sessions.findOne({ _id: sessionId });
        check(session, Object);
        if (session.current._id !== quesId) {
            Meteor.Error("Invalid question id");
        }
        // choice data
        const data = {
            opt: optionId,
            score: session.current.options[opt].score,
        };
        const finished = (Questions.maxType() === session.current.type);
        // update
        return Sessions.update({ _id: sessionId }, {
            "$set": {
                "choices.quesId": data,
                "current.checked": optionId,
                "finished": finished,
            },
        });
    },

    'questions.next'(sessionId) {
        // get session
        check(sessionId, String);
        const session = Sessions.findOne({ _id: sessionId });
        check(session, Object);
        if (!session.current.checked) {
            return Meteor.Error("Another question awating selection");
        }
        if (session.finished) {
            return Meteor.Error("The Session was already over");
        }
        // next question
        const ques = getNextQuestion(session);
        // find first result, and add it to current session
        Session.update({ _id }, { $set: { current: ques } });
        return true;
    },
});