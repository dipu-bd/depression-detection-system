// Schema for Sessions

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { QuestionSchema } from "./questions";

export const SessionSchema = new SimpleSchema({ 
    name: {
        type: String,
        label: "Full Name",
    },
    /*email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail",
    },*/
    batch: {
        label: "Batch",
        type: String,
        autoform: {
            options: function(){
                var data = [];
                var thisYear = (new Date()).getFullYear();
                for (var i = thisYear; i >= 2000; i--) {
                    data.push({ label: i, value: i });   
                }
                return data;
            }
        },
    },

    regno: {
        type: String,
        //optional: true,
        label: "Registration Number",
    },
    /*gender: {
        type: String,
        //optional: true,
        allowedValues: ['male', 'female', 'other'],
        autoform: {
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" }
            ]
        },
    },
    dob: {
        type: Date,
        //optional: true,
        label: "Date of Birth",
        autoform: {
            type: "pickadate",
            pickadateOptions: {
                selectMonths: true,
                selectYears: 100,
                formatSubmit: 'd mmmm, yyyy',
                format: 'd mmmm, yyyy',
            }
        }
    },*/
 
    current: {
        type: String,
        optional: true,
    },
    checked: {
        type: Boolean,
        defaultValue: true,
    },
    finished: {
        type: Boolean,
        defaultValue: false,
    },
    statistics: {
        type: Boolean,
        defaultValue: false,
    },

    // auto-managed properties
    createdAt: {
        type: Date,
        optional: true,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
            if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            }
            // Otherwise prevent user from supplying their own value
            this.unset();
        },
    },
    updatedAt: {
        type: Date,
        denyInsert: true,
        optional: true,
        autoValue() {
            if (this.isUpdate) {
                return new Date();
            }
        },
    },
});