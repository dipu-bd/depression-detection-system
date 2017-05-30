// Controller for statistics page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { ReactiveVar } from 'meteor/reactive-var';
import { Chart } from 'meteor/chart:chart';

import "../../components/loader/loader";
import "./stats.html";
import "./stats.scss";
import Graphs from "./graphs";

var stats = new ReactiveVar(null);
var loading = new ReactiveVar(true);

function getBatch() { 
    return FlowRouter.getParam('batch');
}

function calculateEntities(self) {
    loading.set(true);
    //console.log(getBatch());
    self.autorun(function () {
        // Asynchronous call for statistics
        Meteor.call('statistics', getBatch(), function (error, result) {
            if (error) {
                console.log(error);
                Materialize.toast(error.reason, 5000);
            } else {
                //console.log(result);
                stats.set(result);
                Graphs.stats = result;
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
    loggedIn() {
        return localStorage.getItem('session') == 'true';
    },
    repeat(labels, field) {
        var data = [];
        const list = stats.get()[field];
        _.each(labels, (label, i) => {
            data.push({
                label,
                link: '/admin/users/' + field + '/' + i,
                value: (list && list[i] && list[i].count) || 0
            });
        });
        return data;
    },
    bdsMessage() {
        return [
            'Having no depression',
            'Having mild mood disturbances',
            'Having borderline clinical depression',
            'Having moderate depression',
            'Suffering from severe depression',
            'Suffering from extreme depression'
        ];
    },
    basMessage() {
        return [
            'Having minimum level of anxiety',
            'Having mild anxiety',
            'Having moderate anxiety',
            'Suffering from severe anxiety'
        ];
    },
    bhsMessage() {
        return [
            'Not particularly hopeless',
            'Feeling very hopeless'
        ];
    },
    bssMessage() {
        return [
            'No significant suicidal tendency',
            'At a significant risk for suicide'
        ];
    },
});

Template.statistics.onRendered(function () {
    this.autorun(function() {
        if(stats.get()) {
            new Chart($('#depression-chart').get(0).getContext('2d')).Pie(Graphs.Depression());
            new Chart($('#anxiety-chart').get(0).getContext('2d')).Pie(Graphs.Anxiety());
            new Chart($('#hopeless-chart').get(0).getContext('2d')).Pie(Graphs.Hopeless());
            new Chart($('#suicide-chart').get(0).getContext('2d')).Pie(Graphs.Suicide());
        }
    });
});
