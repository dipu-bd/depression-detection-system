// Methods related to questions

import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Questions } from './questions';
import { Sessions } from './sessions';
import { Choices } from './choices';
import { Statistics } from './statistics';

import { QuestionFinder } from '/imports/lib/ques-finder.js';

Meteor.methods({

    'sessions.insert'(doc) {
        check(doc, Sessions.schema);
        return Sessions.insert(doc);
    },

    'questions.next'(sessionId) {
        // validate
        if (!Match.test(sessionId, String)) {
            throw new Meteor.Error("Invalid session id");
        }
        const session = Sessions.findOne({ _id: sessionId });
        if (!Match.test(session, Object)) {
            throw new Meteor.Error("Session was not found");
        }
        if (session.finished) {
            throw new Meteor.Error("The Session is already over");
        }
        // get next question 
        const quesId = QuestionFinder.findOne(session);
        const finished = Questions.isLast(session.current);
        return Sessions.update({ _id: sessionId }, {
            $set: {
                "current": quesId,
                "checked": false,
                "finished": finished,
            }
        });
    },

    'choices.set'(sessionId, quesId, optionId) { 
        // validate
        check(sessionId, String);
        const session = Sessions.findOne({ _id: sessionId });
        if (!Match.test(session, Object)) {
            throw new Meteor.Error("Session was not found");
        }
        const question = Questions.findOne({ _id: quesId });
        if (!Match.test(question, Object)) {
            throw new Meteor.Error("Question was not found");
        }
        if (question.options.length <= optionId) {
            throw new Meteor.Error("Option is not valid");
        }
        // update session if it is current question
        if (Match.test(quesId, session.current)) {
            const finished = Match.test(question.type, Questions.maxType());
            Sessions.update({ _id: sessionId }, {
                "$set": {
                    "checked": true,
                    "finished": finished,
                }
            });
        }
        // find if choice exists
        const src = { session: sessionId, question: quesId };
        let choice = Choices.findOne(src);
        if (Match.test(choice, Object)) {
            //update if found
            return Choices.update(src, {
                $set: { option: optionId },
            });
        } else {
            // insert if not found
            return Choices.insert({
                session: sessionId,
                question: quesId,
                option: optionId,
            });
        }
    },

    'statistics'(batch) {
        check(batch, String);
        // first update statistics
        Meteor.call('statistics.update');
        // generate statistics data
        let data = {};    
        data.batch = batch;
        data.session = Sessions.numbers(batch);
        ['anxiety', 'depression', 'hopeless', 'suicide'].forEach((scale) => {
            data[scale] = Statistics.generate(scale, batch);
        });
        return data;
    },

    'statistics.update'() {
        // update statistics data
        Sessions.find({
            'finished': true,
            'statistics': { $ne: true }
        }).forEach(function (session) {
            //console.log(session._id);
            Statistics.calculate(session); 
        });
        return true;        
    }
});