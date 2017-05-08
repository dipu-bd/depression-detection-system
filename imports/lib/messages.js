
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import { Choices } from "/imports/api/choices";
import { Sessions } from '/imports/api/sessions';
import { Questions } from "/imports/api/questions";
import { SessionCookie } from '/imports/lib/cookies';

export class Messages {

    // initialize for calculation
    constructor(id) {
        this.id = id;
        const choices = Choices.allChoices(id);
        this.options = Questions.optionDetails(choices);
        this.total = this.totalScore();
    }

    completed() {
        return this.options.length === Questions.count();
    }

    // calculate the total score
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
            return "These ups and downs are considered normal.";
        } else if (this.total <= 16) {
            return "You have mild mood disturbance.";
        } else if (this.total <= 20) {
            return "You have borderline clinical depression.";
        } else if (this.total <= 30) {
            return "You have moderate depression.";
        } else if (this.total <= 40) {
            return "You are suffering from severe depression.";
        } else if (this.total <= 63) {
            return "You are suffering from extreme depression!";
        } else {
            return "Your depression level is immeasurably high.";
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
            return "You are suffering from severe anxiety.";
        } else {
            return "Your anxiety level is immeasurably high.";
        }
    }

    // calculate the score of a question given the type
    scoreOf(typeId) {
        const opt = this.options[typeId - 1];
        return opt ? opt.score : 0;
    }

    bssScore() {
        let score = 0;
        score += this.scoreOf(1);
        score += this.scoreOf(2);
        score += this.scoreOf(3);
        if (this.scoreOf(4) + this.scoreOf(5) === 0) {
            score += this.scoreOf(18);
            score += this.scoreOf(19);
        } else {
            for (let i = 4; i <= 19; i++) {
                score += this.scoreOf(i);
            }
        }
        return score;
    }

    // beck suicide scale
    bss() {
        if (this.bssScore() <= 24) {
            return "You do not have significant suicidal tendency.";
        } else {
            return "You are at a significant risk for suicide.";
        }
    }

    bhsScore() {
        const mark = [-1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1];
        let score = 0;
        for (let i = 1; i <= 20; ++i) {
            if (this.scoreOf(i) > 0) {
                score += mark[i];
            } else {
                score += 1 - mark[i];
            }
        }
        return score;
    }

    // beck hopelessness scale
    bhs() {
        if (this.bhsScore() <= 9) {
            return "You do not feel particularly hopeless.";
        } else {
            return "You feel very hopeless and are at some risk for suicide.";
        }
    }

    // proper advices based on score
    advices() {
        if (this.total <= 17) {
            return [
                "You currently do not need any immediate medical attention.",

                "Do not forget to exercise regularly to keep your body " +
                "and mind healthy and fit.",

                "Consult with a psychiatrist and ask for more advices fit for you."
            ];
        }
        else {
            return [
                "You currently in need of immediate medical attention.",

                "Call a doctor and ask for a psych referral for your depression. " +
                "Most physicians and treatment professionals will offer a number of " +
                "resources you can use to get the help you need.",

                "Visit doctors with this report in hand so you that can use your answers " +
                "as a starting point.",

                "Follow your psychiatrist’s prescribed course of therapy for " +
                "several weeks before you decide whether it’s working or not. " +
                " Often some combination of antidepressants, psychodynamic therapy " +
                "and cognitive-behavioral therapy will yield promising results."
            ];
        }
    }

};
