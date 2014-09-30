var Joi = require("joi");

// This is a valid value for integer rating 1 - 5
var intRating = Joi.number().integer().min(1).max(5);

// Model for NosQuestions, VosRéponses Inc.
module.exports = {
    collection: 'survey1',    // MongoDB collection
    // Create options
    create: {
        // Valid create payload 
        payload: Joi.object().keys({ 
            // Do you know any French people? yes or no (required)
            q1: Joi.boolean().required(),
            // Do you know any Parisians? yes or no (required if answered yes in q1)
            q2: Joi.alternatives()
                .when('q1', { is: true, then: Joi.boolean() }),
            // How many french in paris do you know? 1-6, 6-10, 11-50 or 50+ (required if answered yes in q2)
            q3: Joi.alternatives()
                .when('q2', { is: true, then: Joi.valid('1-5', '6-10', '11-50', '50+') }),
            // Rate 20% of most friendly, from how many people you know answered in q3, individually on 1-5 rating
            q4: Joi.alternatives()
                .when('q3', {is: '1-5', then: Joi.array().min(0).max(1).includes(intRating) })
                .when('q3', {is: '6-10', then: Joi.array().min(1).max(2).includes(intRating) })
                .when('q3', {is: '11-50', then: Joi.array().min(2).max(10).includes(intRating) })
                .when('q3', {is: '50+' , then: Joi.array().min(10).includes(intRating)}),
            // Rate remaining 80%, from how many people you know answered in q3, individually on 1-5 rating
            // This seems impractical as may have to answer for 40 people!
            q5: Joi.alternatives()
                .when('q3', {is: '1-5', then: Joi.array().min(1).max(4).includes(intRating) })
                .when('q3', {is: '6-10', then: Joi.array().min(4).max(8).includes(intRating) })
                .when('q3', {is: '11-50', then: Joi.array().min(8).max(40).includes(intRating) })
                .when('q3', {is: '50+' , then: Joi.array().min(40).includes(intRating) }),
            // Rate the reputation of Parisians in general, 1-5 rating
            q6: intRating.required()    
        }).required(),                 
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
            q1: Joi.boolean(), // yes or no (required)
            q2: Joi.alternatives().when('q1', { is: true, then: Joi.boolean() }), // if q1 yes then, yes or no (required)
            q3: Joi.alternatives().when('q2', { is: true, then: Joi.valid('1-5', '6-10', '11-50', '50+') }),
            q4: Joi.alternatives()
                .when('q3', {is: '1-5', then: Joi.array().min(0).max(1).includes(intRating) })
                .when('q3', {is: '6-10', then: Joi.array().min(1).max(2).includes(intRating) })
                .when('q3', {is: '11-50', then: Joi.array().min(2).max(10).includes(intRating) })
                .when('q3', {is: '50+' , then: Joi.array().min(10).includes(intRating)}),
            q5: Joi.alternatives()
                .when('q3', {is: '1-5', then: Joi.array().min(1).max(4).includes(intRating) })
                .when('q3', {is: '6-10', then: Joi.array().min(4).max(8).includes(intRating) })
                .when('q3', {is: '11-50', then: Joi.array().min(8).max(40).includes(intRating) })
                .when('q3', {is: '50+' , then: Joi.array().min(40).includes(intRating)}),
            q6: intRating         
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