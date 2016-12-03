// To find the next question

import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Questions } from '/imports/api/questions';
import { Sessions } from '/imports/api/sessions';

export const QuestionFinder = {

    findOne(session) {
        // build search parameters
        let type = Questions.getType(session.current);
        if (!session.checked) type++;
        const src = {
            type,
        };
        const sort = {
            createdAt: -1,
        }
        //console.log(src, sort);

        // send next question
        const ques = Questions.findOne(src, { sort });
        if (!Match.test(ques._id, String)) {
            throw new Meteor.Error("Could not find any question");
        }

        return ques._id;
    },
};