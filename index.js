
var express = require("express");
var app = express();
var port = process.env.PORT || 3008;

var google = require('google')
google.resultsPerPage = 2

var twilio = require('twilio');
var accountSid = 'AC2548f291356ba5913366f0d444eead03'; // Your Account SID from www.twilio.com/console
var authToken = 'e1d0daf5e1965be223b10c9438c3df3f';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/sms', (req, response) => {
    phone_number = JSON.stringify(req.body.From, null, 2);
    response_body = JSON.stringify(req.body.Body);
  
   
    google(response_body, function (err, res){
        if (err) console.error(err)
        var responseMessage = "";
        if (res.links.length > 0) {
        
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            responseMessage = responseMessage +'\n'+link.description;
        }

        client.messages.create({
            body: responseMessage,
            to: phone_number,  // Text this number
            from: '+19738280950' // From a valid Twilio number
        })
        .then((message) => {            // on success of sending sms
          console.log(message.sid);
          response.send(message.sid);
        }).catch((error)=>{             // catch if there is any error from twilio
            console.log(error); 
        });
        // const twiml = new MessagingResponse();
        // response.writeHead(200, {'Content-Type': 'text/xml'});
        // twiml.message(responseMessage);         
        // response.end(twiml.toString());

       

        }
      })
  });

app.listen(port,function(){
    console.log("Running on port "+ port);
});


