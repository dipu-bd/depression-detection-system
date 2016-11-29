// Controller for /test page

import { AutoForm } from "meteor/aldeed:autoform";
import { Stats } from "../../../api/stats/stats.js";

import "./test.html";

Template.registerHelper('Stats', Stats);

Template.App_test.onRendered(() => {
    
}); 

Template.App_test.events({
    'submit #statsForm'(event) {
        console.log("Submitted", event.target);

        return false;
    },
}); 