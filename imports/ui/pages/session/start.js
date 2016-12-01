// Controller for /test page

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Sessioonss } from "/imports/api/sessions/sessions";
import { Match } from 'meteor/check'

import "./start.html";
import "./start.scss";

Template.App_session_start.onCreated(function () {
    const user = Session.get("session") || {};
    if (Match.test(user._id, String)) {
        Meteor.setTimeout(function () {
            FlowRouter.go('App.session', { id: user._id });
        });
    }
});

Template.App_session_start.helpers({
    SessionSchema() {
        return Sessioons.schema;
    },
})

AutoForm.addHooks('sessionForm', {
    formToDoc(doc) {
        Sessioons.schema.clean(doc);
        return doc;
    },
    onError(operation, error) {
        if (error) {
            console.log(error);
            Materialize.toast(error, 4000);
        }
    },
    onSubmit(insertDoc) {
        const form = this;
        Meteor.call('sessions.insert', insertDoc, function (err, res) {
            if (err) {
                form.done(err);
            } else {
                Session.set("session", { _id: res });
                Meteor.setTimeout(function () {
                    FlowRouter.go('App.session', { id: res });
                });
            }
        });
        return false;
    }
});