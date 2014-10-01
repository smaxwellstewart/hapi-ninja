Bonus Answer
============

Though I was a little unsure of exactly what was required in the bonus section, I understood the brief have two key features:

1. Get a 'friendliness' metric for each survey by weighting questions for each survey.

2. Enable these metrics to be fetched in realtime and scale for no. users on the order of magnitude of a billion!

Below is my proposal for how to obtain weighted overall results for each survey, and how to report this in realtime.

Weighted Results
----------------

#### Survey 1

I would use the following equation to get a 'friendliness' metric, F, from each survey response:

![Friendliness Equation](/img/survey1-equation.gif)

Where w<sub>4</sub> is the weighting of q4, w<sub>5</sub> is the weighting of q5, w<sub>6</sub> is the weighting of q6. I think the average ratings, ![AVG q4](/img/s1-avgQ4.gif) , ![AVG q5](/img/s1-avgQ5.gif) , in question 4 and question 5 are twice as significant, as the general rating given in q6. This is because they provide a more detailed answer. Therefore suitable values for these weightings could be (in this survey 1 is most friendly, so low weightings are more significant):

![Individual Weights](/img/s1-weights.gif)

W is the weighting assigned to the whole survey response, the survery weight, it is meant to adjust the importance of a given survey based on the amount of Parisians the respondent knows, ![N](/img/s1-N.gif)

![Survey Weight](/img/s1-survey-weight.gif)

This term ensures that a survery where the respondent know lots of Parisians has a lower weighting (more significant):

![Survey Weight Graph](/img/W-graph.png)

#### Survey 2

I would use the following equation to get a 'friendliness' metric, F, from each survey response:

![Friendliness Equation](/img/s2-equation.gif)

Where w<sub>r</sub> is the weighting for respect rating, w<sub>w</sub> is the weighting for welcoming rating, w<sub>i</sub> is the weighting for indiffernt rating, indicated in q3. I felt the other qualities asked for in q3 were not relevant to friendliness, weighting of 0.

w<sub>4</sub> is meant to adjust the metric if the respondent would not be willing to make friends with a Parisian. I view this as a useful overall indicator of how much the respondent's ratings in q3 should be weighted. For q4 = true || false:

![w4 weight](/img/s2-w4.gif)

W, the survery weight, is meant to adjust the importance of a given survey based on the amount of Parisians the respondent knows, and the amount of Parisians the respondent knows well,

![Survey Weight](/img/s2-survey-weight.gif)

This term ensures that a survery where the respondents know lots of Parisians, that they know well, have a higher weighting.

#### Survey 3

As I described in the [clarifications](/docs/clarifications) page, I could not see how the structure of the data in this question could give any meaningful metrics.

Realtime Reporting
-------------------

So we have a formula that can be evaluated for each survey to give us a 'friendliness' metric. I would then employ two techniques to allow for realtime, scalable reporting of these metrics:

 - MapReduce - generates metric reports in an efficient manner
 - Basic Lambda Architecture - allows for realtime reporting, scalable reporting of MapReduce reports

#### MapReduce

This is technique for rapidly aggregating over large data sets. Here is my rough outline of the map-reduce query in MongoDB, for Survey 1:

```javascript
// Map - This is where we map the values we want to use
var map = function() {
 	var key = this._id;
 	// Values we need
 	var value = {
 		q4: this.q4,
 		q5: this.q5,
 		q6: this.q6
 	}
 	emit(key, value)
}
// Reduce - This is where we reduce our data into a our metric
var reduce = function(surveyId, values) {
	// Predefined weighting
	var w4 = 0.25;
	var w5 = 0.25;
	var w6 = 0.5;

	// Survey Weight based on total know Parisians, n
	var n = values.q4.length + values.q5.length;
	var W = 1/(n+1);

	// Calculate averages
	var avgQ4 = Array.sum(values.q4)/values.q4.length;
	var avgQ5 = Array.sum(values.q5)/values.q5.length;

	// Our metric formula
	var F = W*(w4*avgQ4 + w4*avgQ4 + w5+q6);

	return {F: F};
}
```

### Basic Lambda Architecture

In the above section I detail how to generate the metric reports we need, this may not be enough to serve a billion user's querying the DB in realtime, as map reduce jobs are typically costly procedures.

Lambda Architecure's key feature is it's reliance on two data layers:

 - Pre-computed MapReduce reports, generated regularly
 - On-the-fly MapReduce Reports

When the server receives a request for a 'friendliness' report these two layers are combined and served. The idea is to keep the 'On-the-fly' jobs as efficient as possible by keeping the number of docs in this layer to a min.

Using the above map and reduce functions I would achieve this in the following way for Survey 1:

```javascript
// Make a pre-computed report
db.survey1.mapReduce( map,
	reduce,
 	{
 		// Mongo Collection to write to
   		out: { merge: "map_reduce_survey1" },
   		query: {},
   		finalize: function(key, reducedVal) {
   			// Add timestamp of when MapReduce took place
   			reducedVal.date = new Date();
   		}
 	}
)

// On-the-Fly report
// Get date of when last report happens
var lastReport = db.map_reduce_survey1.findOne();
var lastReportDate = lastReport.date;

db.survey1.mapReduce( map,
	reduce,
 	{	
 		// Only report on docs that have been created since last report
   		query: { created:
            { $gt: lastReportDate }
        }
 	}
)
```

The serving layer would then simply combine the 'F' value for the last pre-computed MapReduce report with an On-the-fly report of all the reports that have been created since the last report. 

I think this could be a simple yet powerful solution to serving complex reports to over a billion user's in realtime.

Big Data and Lambda Architecture is something I am keen to learn more about. I am currently taking this course to learn more about it, [https://www.coursera.org/course/mmds](https://www.coursera.org/course/mmds).  

