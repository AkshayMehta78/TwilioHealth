
var express = require("express");
var app = express();
var port = 3006;

var twilio = require('twilio');
var accountSid = 'AC2548f291356ba5913366f0d444eead03'; // Your Account SID from www.twilio.com/console
var authToken = 'e1d0daf5e1965be223b10c9438c3df3f';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

app.get('/', function(req, res){

    client.messages.create({
        body: 'Akshay Mehta CS 643 Fall 2018-19',
        to: '+12019939065',  // Text this number
        from: '+19738280950' // From a valid Twilio number
    })
    .then((message) => {            // on success of sending sms
      console.log(message.sid);
      res.send(message.sid);
    }).catch((error)=>{             // catch if there is any error from twilio
        console.log(error); 
    });

});

app.listen(port,function(){
    console.log("Running on port "+ port);
});


