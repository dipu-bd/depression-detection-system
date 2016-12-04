
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import { Choices } from "/imports/api/choices";
import { Sessions } from '/imports/api/sessions';
import { Questions } from "/imports/api/questions";
import { SessionCookie } from '/imports/lib/cookies';

export class Messages {
    constructor(id) {
        this.id = id;
        const choices = Choices.allChoices(id);
        this.options = Questions.optionDetails(choices);
        this.total = this.totalScore();
    }

    totalScore() {
        let total = 0;
        this.options.forEach(function (opt) {
            total += opt.score;
        });
        return total;
    }

    // beck depression scale 
    bds() {
        if (this.total <= 10) {
            return "You do not have any depression.";
        } else if (this.total <= 16) {
            return "You have mild mood disturbance.";
        } else if (this.total <= 20) {
            return "You have borderline clinical depression.";
        } else if (this.total <= 30) {
            return "You have moderate depression.";
        } else if (this.total <= 40) {
            return "You are suffering from severe depression.";
        } else {
            return "You are suffering from extreme depression!";
        }
    }

    // beck anxiety scale
    bas() {
        if (this.total <= 7) {
            return "You have minimum level of anxiety.";
        } else if (this.total <= 15) {
            return "You have mild anxiety.";
        } else if (this.total <= 25) {
            return "You have moderate anxiety.";
        } else if (this.total <= 63) {
            return "You are suffering from severe level of anxiety.";
        } else {
            return "Your anxiety level is immeasurably high.";
        }
    }

    // beck suicide scale
    bss() {
        let score = 0;
        score += this.options[0].score;
        score += this.options[1].score;
        score += this.options[2].score;
        if (this.options[3].score === 0 && this.options[4].score === 0) {
            score += this.options[17].score;
            score += this.options[18].score;
        } else {
            for (let i = 3; i <= 18; i++) {
                score += this.options[i].score;
            }
        }
        if (score > 24) {
            return "You are at significant risk for suicide.";
        } else {
            return "You do not have significant suicidal tendency.";
        }
    }

    // beck hopelessness scale
    bhs() {
        const mark = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1];
        let score = 0;
        for(let i = 0; i <= 20; ++i) {
            if(this.options[i].score > 0) {
                score += mark[i];
            }
        }
        if(score > 8) {
            return "You feel very hopeless and at greater risk for suicide.";
        } else {
            return "You do not feel particularly hopeless.";
        }
    }

};