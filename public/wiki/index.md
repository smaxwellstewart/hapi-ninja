Introduction
=============

Getting Started
---------------

### Requirements

**Node.js** - Because it's fast, easy to get started, and Javscript is awesome.
[http://nodejs.org/](http://nodejs.org/)

**Mongo** - A great NoSQL database that handles JSON natively, perfect fit for Node.js projects.
[http://www.mongodb.org/](http://www.mongodb.org/)

### Installation

```bash
$ git clone https://github.com/smaxwellstewart/hapi-ninja.git --branch seedbox
$ cd hapi-ninja
$ npm install
```

Brief
-----

Below is what I understand the brief to be. There were a few places where I was unsure of the wording, I have detailed this in the clarification section.

To create a REST API that captures survery responses from 3 different questionares from the L'association Française de Réputation des Parisiens Émigrés. It should also allow accessing and ammending captured repsonses. The API will deliver JSON via HTTP.

Survey 1 
---------

### NosQuestions, VosRéponses Inc.

1. Do you know any French people? *boolean (required)*
2. Do you know any Parisians? *boolean (required if answered true in q1)*
3. How many french in paris do you know? *'1-6', '6-10', '11-50' or '50+' (required if answered true in q2)*
4. Rate 20% of most friendly, from how many people you know answered in q3? *array of integers from 1-5 rating (required array length depends on q3)*
5. Rate remaining 80%, from how many people you know answered in q3? *array of integers from 1-5 rating (required array length depends on q3)*
 - This seems impractical as may have to answer for 40 people!
6. Rate the reputation of Parisians in general? *integer from 1-5 rating (required)*

#### Data Model

```js
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

Survey 2
--------

### ParisMonAmi Inc.

1. How many Parisians people do you know? *integer (required, min 0)*
2. How many Parisians people do you know well? *integer (required, min 0)*
3. Based on the Parisian you know, please rate the following? *integer from 1-5 rating (required for each)*
 - respect
 - punctuality
 - cleanliness
 - welcoming
 - indifferent
 - french
4. Would you adopt a french person as a friend? *boolean (required)*

#### Data Model

```js
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

Survey 3
--------

### SondageMieux Inc.

1. How would you rate a Parisian for following fields? *each field as percentage of whole*
 - friendly
 - happy
 - warm
 - generous

2. How would you rate a Parisian for following fields? *each field as percentage of whole*
 - talkative
 - boring
 - stressed
 - pretentious

 #### Data Model

 ```js
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

Clarification
-------------

If this was a brief from a client these are some points I would follow up with them to get further clarification. I have also included the assumptions I made in the face of my ambiguity.

### Required Questions

In general there was no mention of which questions were required. I took this to mean, all questions are assumed required unless stated to be conditional on other answers.

### Survey 1 - Q5.

*"Q5 : [s'affiche si Q3 répondu] 
Sur tous les autres parisiens que vous connaissez, notez chaque de 1 à 5 selon votre appréciation"*

This question seems to imply that the respondent should give a rating for each of the remaining Parisians they know, after in Q4 a rating is given for each of the 20% of friendliest Parisians.

To me this does not make sense for the following reasons:

- GRAMMAR REASON
- No reason to split q4 and q5, might as well combine and ask for an individual rating for all Parisians respondent knows. There would be no difference in the data, but perhaps this would be to help break up the survey from the user's perspective.
- Scoring 80% of Parisians respondent knows could be a lot of individual ratings if they know 50+ would be 40 ratings! This might be a bit laborious.

I took this question at face value and took it to mean what it seems to imply.

### Survey 3

In both questions in this survey it says the following:

*"Dans le camembert graphique suivant, saisissez la proportion de chaque qualité que vous associez à un parisien"*

This implies that the fields listed below each question must all fit into one pie chart. I think this makes it difficult to extract any meaningful data from this survey as the different fields are NOT mutually exclusive.

For example a respondent might give this response for q1.

friendly: 10%
happy: 30%
warm: 30%
generous: 30%

This might seem like the respondent thought Parisians were not very friendly, but in reality it may just be that they think Parisians are happy, warm and generous **more** than they are friendly, but still think Parisians are very friendly.

Personally, I think this creates a lot of unneccessary ambiguity in the data and I would consider asking the client to restructure the survey.