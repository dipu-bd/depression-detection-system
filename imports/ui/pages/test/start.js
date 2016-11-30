// Controller for /test page

import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Stats } from "/imports/api/stats/stats";

import "./start.html";

Template.registerHelper('Stats', Stats);

Template.App_test_start.onCreated(() => {
    const user = Session.get("stats") || {};
    if (user['_id']) {
        Meteor.setTimeout(() => {
            FlowRouter.go('App.test', { _id: user._id });
        });
    }
});

Template.App_test_start.helpers({
    doc: () => Session.get("stats") || {}
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
        Meteor.call('stats.insert', insertDoc, (err, res) => {
            if (err) {
                reset();
                Materialize.toast(err, 4000);
            } else {
                insertDoc._id = res;
                Session.set("stats", insertDoc);
                Meteor.setTimeout(() => {
                    FlowRouter.go('App.test', { _id: res });
                });
            }
        });
        return false;
    }
});