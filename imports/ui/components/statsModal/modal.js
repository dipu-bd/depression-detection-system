// Controller for 'Create new Statistics' modal form template 

import { AutoForm } from "meteor/aldeed:autoform";
import { Stats } from "../../../api/stats/stats.js";

import "./modal.html";

Template.registerHelper('Stats', () => {
    return Stats;
});

AutoForm.addHooks(null, {
    formToDoc: (doc) => {
        return doc;
    },
    onError: (operation, error) => {
        if (error) {
            console.log(error);
        }
    },
    onSuccess: () => {
        alert('all good baby !');
    }
});