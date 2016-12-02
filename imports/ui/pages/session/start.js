// Controller for /test page

import { Match } from 'meteor/check';
import { Cookie } from 'meteor/chuangbo:cookie';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Sessions } from "/imports/api/sessions/sessions";

import "./start.html";
import "./start.scss";

Template.App_session_start.helpers({
    SessionSchema() {
        return Sessions.schema;
    },
    session() {
        return Cookie.get('session');
    }
})

AutoForm.addHooks('sessionForm', {
    formToDoc(doc) {
        Sessions.schema.clean(doc);
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
            // check error
            if (err) {
                form.done(err);
                return false;
            }
            // set cookie
            Cookie.set('session', res, {
                expires: 30,
                path: '/',
            });
            // redirect
            Meteor.setTimeout(function () {
                FlowRouter.go('App.session', { id: res });
            });
        });
        return false;
    }
});