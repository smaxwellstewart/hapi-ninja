Improvements
============

Here are the following improvements I would make to the codebase given more time.

Fix Update Validation
---------------------

At the moment bad payloads can be accepted for updating fields that have conditional requirements. In order to fix this I would validate the final schema after the payload has been extended on the doc to be updated. This would ensure all documents are validated against final schema before insertion.

This would be easily possible as I am already retreiving documents to be updated, before updating them, to ensure document exists. 

Throttle DB Writes
------------------

If there was heavy traffic and write concerns became an issue I would put the create method behind a [RabbitMQ](http://www.rabbitmq.com/) Queue to control the rate of DB writes.

Remove need for extra validation steps
--------------------------------------

At the moment create payloads have to be validated with extra method for Survey 1 and Survey 3. I believe it may be possible to remove the need for these methods by constructing the right Joi validation object.

I tried for quite some time to get this to work but could not see how it was possible.

I submitted a ticket to try and resolve this issue:

[https://github.com/hapijs/joi/issues/447](https://github.com/hapijs/joi/issues/447)