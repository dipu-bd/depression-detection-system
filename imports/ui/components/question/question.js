// Controller for question component

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Choices } from '/imports/api/choices';

import "./question.html";
import "./question.scss";

const colors = ["lime", "blue", "green", "teal", "red"];

Template.question.onRendered(function () {
    const template = this;
    template.$("#question-title").css({
        height: template.$("#option-chooser").height,
    });
})

Template.question.helpers({
    evenSuffix(type) {
        return type % 2 ? "" : "-even";
    },
    leftRight(type) {
        return type % 2 ? "left" : "right";
    },
    headColor(type) {
        return colors[type % colors.length];
    },
    getName() {
        return this._id;
    },
    getId(index) {
        return this._id + "-" + index;
    },
    getChecked(option) {
        const choice = Choices.findOne({
            question: this._id,
            session: this.session,
        });
        // return class modifier
        return (choice && choice.option === option) ? "checked" : "";
    },
});

/*
Template.question.events({
    'click .option input'(event, template) { 
        // call server function
        const session = template.data.session;
        const ques = template.data._id;
        const index = event.target.value; 
        Meteor.call('choices.set', session, ques, index, function (err) {
            if (err) {
                console.log(err);
                Materialize.toast(err, 4000);
            }
        });
    },
});
*/
