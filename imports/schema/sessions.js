// Schema for Sessions

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { QuestionSchema } from "./questions";

export const SessionSchema = new SimpleSchema({
    /*
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    */
    name: {
        type: String,
        label: "Full Name",
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail",
    },
    dob: {
        type: Date,
        label: "Date of Birth",
        max: new Date(),
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

    questions: {
        type: [QuestionSchema],
        defaultValue: [],
    },
    checked: {
        type: Number,
        defaultValue: 0,
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