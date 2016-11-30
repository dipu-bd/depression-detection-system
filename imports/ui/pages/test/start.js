// Controller for /test page

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Stats } from "/imports/api/stats/stats";
import { Match } from 'meteor/check'

import "./start.html";

Template.App_test_start.onCreated(function() {
    const user = Session.get("stat") || {};
    if (Match.test(user._id, String)) {
        Meteor.setTimeout(function() {
            FlowRouter.go('App.test', { statId: user._id });
        });
    }
});

Template.App_test_start.helpers({
    doc() {
        return Session.get("stat");
    },
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
        const reset = this.resetForm;
        Meteor.call('stats.insert', insertDoc, function(err, res) {
            if (err) {
                reset();
                Materialize.toast(err, 4000);
            } else {
                insertDoc._id = res;
                Session.set("stat", insertDoc);
                Meteor.setTimeout(function() {
                    FlowRouter.go('App.test', { _id: res });
                });
            }
        });
        return false;
    }
});