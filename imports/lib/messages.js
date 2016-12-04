
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
        //const choices = Choices.allChoices(id);
        //this.options = Questions.optionDetails(choices);
    }

    // beck depression scale 
    bds() {

    }

    // beck anxiety scale
    bas() {

    }

    // beck suicide scale
    bss() {

    }

    // beck hopelessness scale
    bhs() {

    }

};