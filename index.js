const Express = require("express");
const BodyParser = require("body-parser");
const Superagent = require("superagent");

const app = Express();
app.use(BodyParser.urlencoded({
  extended: true
}));

// Incoming slash command handler (/weather)
app.post("/weather", function(request, response) {
  // Verify incoming request
  if (request.body.token != process.env.SLACK_VERIFICATION_TOKEN) {
    response.status(400).send('Bad Request');
    return;
  }

  // URL to send reply to
  var responseUrl = request.body.response_url;

  // parameters passed through the command
  var zipCode = request.body.text;
  Superagent.get("api.openweathermap.org/data/2.5/weather")
            .query({zip: zipCode, appid: "4c153f6844341bd15cc4c0480b680258"})
            .end((err, res) => {
    var text = "";
    if (err) {
      console.log("err:", err);
      text = "Something wrong with the weather API";
    } else {
      console.log(res.body);
      text = "Weather is " + res.body["weather"][0]["main"] + " at " + zipCode;
    }

    // Send the result back to slack
    Superagent.post(responseUrl).send({text: text}).end();
  });

  response.status(200);
});

app.get("/", function(request, response) {
  if (!process.env.SLACK_VERIFICATION_TOKEN) {
    response.send("Verification token is not set in the .env file");
    return;
  }

  response.send("Follow the instruction in README to install the app with Slack");
});

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
