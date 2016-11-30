// Controller for /test page

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Stats } from "/imports/api/stats/stats";

import "./start.html";

Template.registerHelper('Stats', Stats);

Template.App_test_start.onCreated(function() {
    const user = Session.get("stats") || {};
    if (user['_id']) {
        Meteor.setTimeout(function() {
            FlowRouter.go('App.test', { _id: user._id });
        });
    }
});

Template.App_test_start.helpers({
    doc: Session.get("stats") || {}
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
        Meteor.call('stats.insert', insertDoc, function(err, res) {
            if (err) {
                this.resetForm();
                Materialize.toast(err, 4000);
            } else {
                insertDoc._id = res;
                Session.set("stats", insertDoc);
                Meteor.setTimeout(function() {
                    FlowRouter.go('App.test', { _id: res });
                });
            }
        });
        return false;
    }
});