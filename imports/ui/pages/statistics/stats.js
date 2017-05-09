// Controller for statistics page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { ReactiveVar } from 'meteor/reactive-var';

import "../../components/loader/loader";
import "./stats.html";
import "./stats.scss";

var stats = new ReactiveVar(null);
var loading = new ReactiveVar(true);

function getBatch() {    
    return FlowRouter.getParam('batch');
}

function calculateEntities(self) {
    loading.set(true);
    self.autorun(function () {
        // Asynchronous call for statistics
        Meteor.call('statistics', getBatch(), function (error, result) {
            if (error) {
                console.log(error);
                Materialize.toast(error.reason, 5000);
            } else {
                console.log(result);
                stats.set(result);
            }
            loading.set(false);
        });
    });
} 

Template.App_stats.onCreated(function () {   
    calculateEntities(this);
});

Template.App_stats.helpers({ 
    isLoading() {
        return loading.get();
    },
    getStats() {
        return stats.get();
    },
});

Template.statistics.helpers({ 
    count(value) {
        return (value || 0);
    }
});
