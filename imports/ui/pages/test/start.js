// Controller for /test page

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Stats } from "/imports/api/stats/stats";
import { Match } from 'meteor/check'

import "./start.html";
import "./start.scss";

Template.App_test_start.onCreated(function () {
    const user = Session.get("stat") || {};
    if (Match.test(user._id, String)) {
        Meteor.setTimeout(function () {
            FlowRouter.go('App.test', { statId: user._id });
        });
    }
});

Template.App_test_start.helpers({
    StatsSchema() {
        return Stats.schema;
    },
})

AutoForm.addHooks('statsForm', {
    formToDoc(doc) {
        Stats.schema.clean(doc);
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
        Meteor.call('stats.insert', insertDoc, function (err, res) {
            if (err) {
                form.done(err);
            } else {
                Session.set("stat", { _id: res });
                Meteor.setTimeout(function () {
                    FlowRouter.go('App.test', { statId: res });
                });
            }
        });
        return false;
    }
});