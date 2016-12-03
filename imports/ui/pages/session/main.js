// Controller for main session page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Choices } from '/imports/api/choices';
import { Sessions } from '/imports/api/sessions';
import { Questions } from '/imports/api/questions';
import { SessionCookie } from '/imports/lib/cookies';
 
import "../../components/loader/loader";
import "../../components/question/question";
import "./main.scss";
import "./main.html";



function sessionId() {
    return FlowRouter.getParam('_id');
}
function session() {
    return Sessions.findOne();
}

function loadQuestion(template) {
    template.autorun(function () {
        Meteor.call("questions.next", sessionId(), function onError(err) {
            if (err) {
                console.log(err);
                Materialize.toast(err, 4000);
            }
        });
    });
}



Template.App_session_main.onCreated(function () {

    const template = this; 
    template.autorun(() => {
        template.subscribe('questions.all');
        template.subscribe('choices.user', sessionId());
        template.subscribe('sessions.user', sessionId(), {
            onError() {
                SessionCookie.remove();
                FlowRouter.go('App.session.start');
            }, onReady() {
                SessionCookie.set(sessionId());
                if (!session().finished) {
                    loadQuestion(template);
                }
            }
        });
    });
});

Template.App_session_main.helpers({
    name() {
        return session().name;
    },
    questions() {
        var keys = Choices.questions(sessionId(), [session().current]);
        return Questions.find({ _id: { '$in': keys } }, { sort: { type: -1 } });
    },
    nextButtonDisable() {
        return session().checked ? "" : "disable";
    },
    nextButtonLabel() {
        return session().finished ? "View Result" : "Next Question";
    },
    questionArg(ques) {
        ques.session = sessionId();
        return ques;
    },
});

Template.App_session_main.events({
    'click #end-session-button': function (event, template) {
        SessionCookie.remove();
        FlowRouter.go("App.home");
    },
    'click #next-question-button': function (event, template) {
        if (session().finished) {
            FlowRouter.go("App.result", { _id: sessionId() });
        }
        else {
            loadQuestion(template);
            if (!session().checked) {
                Materialize.toast("Please check the last question", 4000);
            }
        }
    },
});