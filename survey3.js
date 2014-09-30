// SondageMieux Inc.

var Joi = require("joi");

var perRating = Joi.number().min(0).max(100).required();

var schema = Joi.object().keys({
    // How would you rate a Parisian for following fields, as percentage 
    q1: Joi.object().keys({
        friendly: perRating
        happy: perRating
        warm: perRating
        generous: perRating
    }),
    // How would you rate a Parisian for following fields, as percentage 
    q2: Joi.object().keys({
        talkative: perRating
        boring: perRating
        stressed: perRating
        pretentious: perRating
    }),
});


var res = Joi.validate(payload, schema, {abortEarly: false}); 
console.log(res)