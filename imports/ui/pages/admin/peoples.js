// Controller for people page

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/erasaur:meteor-lodash';

import { Sessions } from "/imports/api/sessions";

import "./peoples.html";
import "./peoples.scss";

function scale() {
    return FlowRouter.getParam('scale');
}
function category() {
    return Number(FlowRouter.getParam('category'));
}

Template.App_users.onCreated(function () {
    const template = this;
    template.autorun(() => {
        template.subscribe('stats.users', String(scale()), String(category()), {
            onError(err) {
                console.log(err);   
                Materialize.toast(err, 5000);             
            }
        });
    });
});

Template.App_users.helpers({
    getPeoples() {
        return Sessions.find();
    },
    getType() {
        switch(scale()) {
        case 'depression':
            return [
                'No',
                'Mild',
                'Borderline',
                'Moderate',
                'Severe',
                'Extreme'
            ][category()] 
            + ' Depression';
        case 'anxiety':
            return [
                'No',
                'Mild',
                'Moderate',
                'Severe'
            ][category()]
            + ' Anxiety';
        case 'suicide':
            return [
                'No risk of',
                'At a risk of'
            ][category()]
            + ' Suicide';
        case 'hopeless':
            return [
                'Not',
                'Particularly'
            ][category()]
            + ' Hopeless';
        }
    }
});