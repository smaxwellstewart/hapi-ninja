API
===

The API can be accessed on this domain, http://seedbox.smaxwellstewart.com/api/{path*}

Survey 1
--------

### CREATE RESPONSE

 - **POST** /api/survey1.json

Capture a survey response from the following valid payloads...

```javascript
// Full payload example
{
    "q1": true, // yes
    "q2": true, // yes
    "q3": "6-10", // know 6-10 parisians
    "q4": [ // 1-5 rating for each 20% of all known Parisians (20% of 6-10 is 1-2, so array must be of length 1 or 2)
        1,
        2
    ],
    "q5": [  // 1-5 rating of other 80% of all known Parisians (80% of 6-10 is 4-8, so array must be of length 4-8)
        3,
        4,
        5,
        4
    ],
    "q6": 2
}
// If q2 false, q3, q4, and q5 not required
{
    "q1": true,
    "q2": false,
    "q6": 1
}
// If q1 false, q2 not required
{
    "q1": false,
    "q6": 1
}
```

#### Extra Validation

In order to make sure all conditional questions are required properly, I added this step to the validation of the payload.

```javascript
// Survey 1 needs a little extra validation to make sure all conditional requirements are met
var survey1Validate = function(request, next) {
    // Make q2 required if q1 is answered true
    if(request.payload.q1 === true) {
        var result = Joi.validate(request.payload.q2, Joi.required())
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q2 is required if q1 is true.");
            return next(err).takeover()
        }
    }
    // Make q3, q4 and q5 required if q2 is answered true
    if(request.payload.q2 === true) {
        var schema = {
            q3: Joi.string().required(),
            q4: Joi.array().required(),
            q5: Joi.array().required(),
        };

        var payload = {
            q3: request.payload.q3,
            q4: request.payload.q4,
            q5: request.payload.q5,
        }
        var result = Joi.validate(payload, schema)
        
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q3, q4 and q5 is required if q2 is true.");
            return next(err).takeover()
        }
    }

    return next('validated');
}
```

### FIND / GET ALL RESPONSES

 - **POST** /api/survey1/find.json

Find survery responses based on params in payload. If no payload supplied will simply return all captured responses.

Example find payload...

```javascript
// Find all survery results where q2 was answered 'no'
{
	"q2":false
}
```

### GET SINGLE RESPONSE

 - **GET** /api/survey1/{id}.json

Find a single response based on id param in URL, same as `_id` in mongo doc.

Example find payload...

```javascript
// Find all survery results where q2 was answered 'no'
{
	"q2":false
}
```

### UPDATE RESPONSE

 - **PUT** /api/survey1/{id}.json

Update a single response based on payload. Individual questions can be updated individually.

Example update payloads...

```javascript
{
	"q1":false
}
```

**CAUTION!** At present data model can be violated if submit a single question from a set of conditional questions, violates coniditons. See [improvements](/docs/improvements) for more details on fix.

Example bad update...

```javascript
// Example existing response doc
{
   "_id": "542b1ab020bbb7cd5c820567",
   "q1": true,
   "q2": true,
   "q3": "1-5",
   "q4": [1],
   "q5": [5],
   "q6": 2,
   "created": "2014-09-30T21:03:44.160Z"
}

// Example bad payload
{
   "q3": "6-10",
}
// This should be invalid as, q4 and q5 would then 
// have invalid array lengths according to data model
```

### DELETE RESPONSE

 - **DELETE** /api/survey1/{id}.json

Delete a single response.

Survey 2
--------

Follows exactly the same pattern a described above but with with 'survery2' in path, instead of 'survey1'. 

Examples of valid create payloads...

```javascript
{
    "q1":10, // Integer value greater than 0
    "q2":5, // Integer value greater than 0
    "q3":{
        "respect":1, // 1/5 rating
        "punctuality":2, // 2/5 rating
        "cleanliness":3, // 3/5 rating
        "welcoming":4, // 4/5 rating
        "indifferent":5, // 5/5 rating
        "french":4 // 4/5 rating
    },
    "q4":true // yes
}
```

Survey 3
--------

Follows exactly the same pattern a described above but with with survery3 in path, instead of 'survey1'.

Examples of valid create payloads...

```javascript
{
    "q1": {
        "friendly": 20, // 20 % rating
        "happy": 20, // 20 % rating
        "warm": 20, // 20 % rating
        "generous": 40 // 40 % rating
    },
    "q2": {
        "talkative": 50, // 50 % rating
        "boring": 20, // 20 % rating
        "stressed": 20, // 20 % rating
        "pretentious": 10 // 10 % rating
    }
}

```

#### Extra validation

In order to ensure total percentage of pie chart does not exceed 100% I added this step to the validation of the payload.

```javascript
// Survey 3 needs a little extra validation to make sure all percentages of question <= 100
var survey3Validate = function(request, next) {
    var per1 = request.payload.q1;
    var per2 = request.payload.q2;
    if(per1 !== undefined && per1.friendly !== undefined && per1.warm !== undefined && per1.happy !== undefined && per1.generous !== undefined) {
        var totalPercent = per1.friendly + per1.warm + per1.happy + per1.generous;
        var result = Joi.validate(totalPercent, Joi.number().min(0).max(100).required())
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q1 total percentages must be greater than 0 and less than 100.");
            return next(err).takeover()
        }
    }
    if(per2 !== undefined && per2.talkative !== undefined && per2.boring !== undefined && per2.stressed !== undefined && per2.pretentious !== undefined) {
        var totalPercent = per2.talkative + per2.boring + per2.stressed + per2.pretentious;
        var result = Joi.validate(totalPercent, Joi.number().min(0).max(100).required())
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q2 total percentages must be greater than 0 and less than 100.");
            return next(err).takeover()
        }
    }

    return next('validated');
}
```






