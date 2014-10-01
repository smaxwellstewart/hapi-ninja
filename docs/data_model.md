Data Model
==========

Survey 1 -NosQuestions, VosRéponses Inc.
----------------------------------------

 1. Do you know any French people? (required)
   - *boolean*
 2. Do you know any Parisians? (required if answered true in q1)
   - *boolean*
 3. How many french in paris do you know? (required if answered true in q2)
   - *'1-6'*
   - *'6-10'*
   - *'11-50'*
   - or *'50+'*
 4. Rate 20% of most friendly, from how many people you know answered in q3? (required array length depends on q3 answer)
   - *array of integers from 1-5 rating*
 5. Rate remaining 80%, from how many people you know answered in q3? (required array length depends on q3)
   - *array of integers from 1-5 rating
 6. Rate the reputation of Parisians in general? (required)
   - *integer from 1-5 rating*

#### Data Model

```javascript
// Valid 1-5 Integer Rating
var intRating = Joi.number().integer().min(1).max(5);

// Valid Schema
var schema = Joi.object().keys({ 
    q1: Joi.boolean().required(),
    q2: Joi.alternatives()
        .when('q1', { is: true, then: Joi.boolean() }),
    q3: Joi.alternatives()
        .when('q2', { is: true, then: Joi.valid('1-5', '6-10', '11-50', '50+') }),
    q4: Joi.alternatives()
        .when('q3', {is: '1-5', then: Joi.array().min(0).max(1).includes(intRating) })
        .when('q3', {is: '6-10', then: Joi.array().min(1).max(2).includes(intRating) })
        .when('q3', {is: '11-50', then: Joi.array().min(2).max(10).includes(intRating) })
        .when('q3', {is: '50+' , then: Joi.array().min(10).includes(intRating)}),
    q5: Joi.alternatives()
        .when('q3', {is: '1-5', then: Joi.array().min(1).max(4).includes(intRating) })
        .when('q3', {is: '6-10', then: Joi.array().min(4).max(8).includes(intRating) })
        .when('q3', {is: '11-50', then: Joi.array().min(8).max(40).includes(intRating) })
        .when('q3', {is: '50+' , then: Joi.array().min(40).includes(intRating) }),
    q6: intRating.required()    
})
```

Survey 2 - ParisMonAmi Inc.
---------------------------

1. How many Parisians people do you know? (required)
  - *integer, min 0*
2. How many Parisians people do you know well? (required)
  - *integer, min 0*
3. Based on the Parisian you know, please rate the following? (required for each)
 - respect - *integer from 1-5 rating*
 - punctuality - *integer from 1-5 rating*
 - cleanliness - *integer from 1-5 rating*
 - welcoming - *integer from 1-5 rating*
 - indifferent - *integer from 1-5 rating*
 - french - *integer from 1-5 rating*
4. Would you adopt a french person as a friend? (required)
  - *boolean*

 
#### Data Model

```javascript
// Valid 1-5 Integer Rating
var intRating = Joi.number().integer().min(1).max(5);

// Valid Schema
var schema = Joi.object().keys({ 
    q1: Joi.number().integer().min(0).required(),
    q2: Joi.number().integer().min(0).required(),
    q3: Joi.object().keys({
        respect: intRating.required(),
        punctuality: intRating.required(),
        cleanliness: intRating.required(),
        welcoming: intRating.required(),
        indifferent: intRating.required(),
        french: intRating.required()
    }).required(),
    q4: Joi.boolean().required()
})
```

Survey 3 - SondageMieux Inc.
----------------------------

 1. How would you rate a Parisian for following fields? (required for each)
  - friendly - *percentage of whole*
  - happy - *percentage of whole*
  - warm  - *percentage of whole*
  - generous - *percentage of whole*

 2. How would you rate a Parisian for following fields? (required for each)
  - talkative - *percentage of whole*
  - boring - *percentage of whole*
  - stressed - *percentage of whole*
  - pretentious - *percentage of whole*


#### Data Model

```javascript
 // Valid Percentage Rating
 var perRating = Joi.number().min(0).max(100);

// Valid Schema
var schema = Joi.object().keys({
    q1: Joi.object().keys({
        friendly: perRating.required(),
        happy: perRating.required(),
        warm: perRating.required(),
        generous: perRating.required(),
    }).required(),
    q2: Joi.object().keys({
        talkative: perRating.required(),
        boring: perRating.required(),
        stressed: perRating.required(),
        pretentious: perRating.required(),
    }).required(),
})
```