// Schema for Sessions

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { QuestionSchema } from "./questions";

export const SessionSchema = new SimpleSchema({ 
    name: {
        type: String,
        label: "Full Name",
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail",
    },
    batch: {
        type: String,
        label: "Batch",
    },
    regno: {
        type: String,
        label: "Registration",
    },
    dob: {
        type: Date,
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
    },
    gender: {
        type: String,
        allowedValues: ['male', 'female', 'other'],
        autoform: {
            options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" }
            ]
        },
    },
 
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