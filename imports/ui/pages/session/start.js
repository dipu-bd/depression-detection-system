// Controller for /test page

import { Match } from 'meteor/check';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Sessions } from "/imports/api/sessions";
import { SessionCookie } from "/imports/lib/cookies";

import "./start.html";
import "./start.scss";

Template.App_session_start.helpers({
    SessionSchema() {
        return Sessions.schema;
    },
    hasCookie() {
        return SessionCookie.get();
    }
});

Template.resume_form.events({
    'click #resume-last': function (event, template) {
        FlowRouter.go('App.session.main', { _id: SessionCookie.get() });
    },
    'click #cancel-last': function (event, template) {
        SessionCookie.remove(); 
        location.reload();
    }
});

AutoForm.addHooks('sessionForm', {
    formToDoc(doc) {
        Sessions.schema.clean(doc);
        return doc;
    },
    onSubmit(insertDoc) {
        const form = this;
        Meteor.call('sessions.insert', insertDoc, function (err, res) {
            // check error
            if (err) {
                form.done(err);
                return false;
            }
            // redirect
            Meteor.setTimeout(function () {
                FlowRouter.go('App.session.main', { _id: res });
            });
        });
        return false;
    },
    onError(operation, error) {
        if (error) {
            console.log(error);
            Materialize.toast(error, 4000);
        }
    },
});