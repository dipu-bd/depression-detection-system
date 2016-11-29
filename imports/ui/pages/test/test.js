// Controller for /test page

import { Stats } from "../../../api/stats/stats.js";
import "../../../api/stats/methods.js";

import "./test.html";

Template.registerHelper('Stats', Stats);

AutoForm.addHooks(null, {
    formToDoc(doc) {
        return doc;
    },
    onError(operation, error) {
        if (error) {
            console.log(error);
            Materialize.toast(error.message, 4000);
        }
    },
    onSuccess() {

    },
    onSubmit(insertDoc) {
        Stats.schema.clean(insertDoc); 
        Meteor.call('stats.insert', insertDoc, (error) => {
            if (error) {
                console.log(error.error); 
            } else { 
                Router.go('/test');
            }
        });
        return false;
    }
});