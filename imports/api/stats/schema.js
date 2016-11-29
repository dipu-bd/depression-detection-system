// Schema for Statistics

import { OptionsSchema } from "../questions/schema/options";
 
export const StatsSchema = new SimpleSchema({
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
        autoform: {
            type: "pickadate",
            pickadateOptions: {
                selectMonths: true,
                selectYears: 100,                 
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

    choice: {
        type: [OptionsSchema],
        blackbox: true, 
        defaultValue: [],
    },
    completed: {
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