// ParisMonAmi Inc.

var Joi = require("joi");

var intRating = Joi.number().integer().min(1).max(5).required();

var schema = Joi.object().keys({ 
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
    }).required(),
    // Would you adopt a french person as a friend? yes or no (required)
    q4: Joi.boolean().required(),
});

var payload = {
    q1: 1,
    q2: 2,
    q3: {
        respect: 1,
        punctuality: 2,
        cleanliness: 3,
        welcoming: 4,
        indifferent: 5,
        french: 5
    },
    q4: false
}


var res = Joi.validate(payload, schema, {abortEarly: false}); 
console.log(res)