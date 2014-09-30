var Joi = require("joi");

// This is a valid value for integer rating 1 - 5
var intRating = Joi.number().integer().min(1).max(5);

// Model for ParisMonAmi Inc.
module.exports = {
    collection: 'survey2',    // MongoDB collection
    // Create options
    create: {
        // Valid create payload 
        payload: Joi.object().keys({ 
            // How many french people do you know? integer (required)
            q1: Joi.number().integer().min(0).required(),
            // How many french people do you know well? integer (required)
            q2: Joi.number().integer().min(0).required(),
            // Rating 1-5 of various qualities
            q3: Joi.object().keys({
                respect: intRating.required(),
                punctuality: intRating.required(),
                cleanliness: intRating.required(),
                welcoming: intRating.required(),
                indifferent: intRating.required(),
                french: intRating.required()
            }),
            // Would you adopt a french person as a friend? yes or no (required)
            q4: Joi.boolean().required(),
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
            // How many french people do you know? integer (required)
            q1: Joi.number().integer().min(0),
            // How many french people do you know well? integer (required)
            q2: Joi.number().integer().min(0),
            // Rating 1-5 of various qualities
            q3: Joi.object().keys({
                respect: intRating,
                punctuality: intRating,
                cleanliness: intRating,
                welcoming: intRating,
                indifferent: intRating,
                french: intRating
            }),
            // Would you adopt a french person as a friend? yes or no (required)
            q4: Joi.boolean(),
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