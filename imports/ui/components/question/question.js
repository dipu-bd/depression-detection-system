// Controller for question component

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import "./question.html";
import "./question.scss";

Template.question.onRendered(function () {
    const template = this;
    template.$("#question-title").css({
        height: template.$("#option-chooser").height,
    });
})

Template.question.helpers({
    classSuffix(type) {
        return type % 2 ? "" : "-even";
    },
    classSuffix2(type) {
        return type % 2 ? "left" : "right";
    },
    classSuffix3(type) {
        return type % 2 ? "lime" : "blue";
    }
});