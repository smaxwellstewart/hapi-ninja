var Joi = require("joi");

// This is a valid value for percent rating
var perRating = Joi.number().min(0).max(100);

// Model for SondageMieux Inc.
module.exports = {
    collection: 'survey3',    // MongoDB collection
    // Create options
    create: {
        // Valid create payload 
        payload: Joi.object().keys({
            // How would you rate a Parisian for following fields, as percentage 
            q1: Joi.object().keys({
                friendly: perRating.required(),
                happy: perRating.required(),
                warm: perRating.required(),
                generous: perRating.required(),
            }).required(),
            // How would you rate a Parisian for following fields, as percentage 
            q2: Joi.object().keys({
                talkative: perRating.required(),
                boring: perRating.required(),
                stressed: perRating.required(),
                pretentious: perRating.required(),
            }).required(),
        }),                 
        date: 'created',    // Sets 'created' field to be dated at doc creation, needed for realtime reporting
        access: "normal"     // Sets which role can create 
    },
    // Read options for get and find
    read: { 
        access: 'normal'        // Sets which role can read 
    },
    // Update options
    update: {
        // Valid update payload
        payload: Joi.object().keys({
            // How would you rate a Parisian for following fields, as percentage 
            q1: Joi.object().keys({
                friendly: perRating.required(),
                happy: perRating.required(),
                warm: perRating.required(),
                generous: perRating.required(),
            }),
            // How would you rate a Parisian for following fields, as percentage 
            q2: Joi.object().keys({
                talkative: perRating.required(),
                boring: perRating.required(),
                stressed: perRating.required(),
                pretentious: perRating.required(),
            }),
        }),
        date: 'updated',    // Sets 'updated' field to be dated at doc update
        access: 'normal' // Sets which role can update  
    },
    // Delete options
    del: {
        access: 'normal' // Sets which role can update 
    },
    // Joi options when validating payloads    
    validationOpts: {
        abortEarly: false
    }
}