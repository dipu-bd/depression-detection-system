// Controller for questionList

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; 

import "../question/question";
import "./questionList.html";
import "./questionList.scss";

Template.question_list.onCreated(function() {    
    Meteor.call("questions.next")
});

Template.question_list.helpers({
    
});