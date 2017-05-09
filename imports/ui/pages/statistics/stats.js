// Controller for statistics page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { ReactiveVar } from 'meteor/reactive-var';

import "../../components/loader/loader";
import "./stats.html";
import "./stats.scss";

var loading = new ReactiveVar(false);

function calculateEntities(self) {
    loading.set(true);
    self.autorun(function () {
        // Asynchronous call
        Meteor.call('statistics', function (error, result) {
            loading.set(false);
            if (error) {
                console.log(error);
                Materialize.toast(error.reason, 5000);
            } else {
                console.log(result);
            }
        });
    });
} 

Template.App_stats.onCreated(function () {
    calculateEntities(this);
});

Template.App_stats.helpers({ 
    isLoading() {
        return loading.get() || !this.subscriptionsReady;
    }
});