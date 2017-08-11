# Simple weather service for Slack (with slash command)

[![Run with Postverta badge](http://postverta.io/badge.svg)](http://postverta.io/direct/postverta/slack-slashcommand)

This app demonstrates how to use Slack API's [slash command feature](https://api.slack.com/slash-commands)
feature to implement a simple weather service. A user can use `/weather [zipcode]` to
access the app and get the current weather condition of a location.

## Installing the app

1. Go to Slack API's homepage [https://api.slack.com/apps/] and create a new app.
Install the app with your team.

2. Go to the "Slack Commands" section under "Features", and create a new slash
command named `/weather`

![Where to find the Slack Commands](https://i.imgur.com/EVSiifo.png)

3. When creating the app, fill in the Request URL field with the this app's URL.

![How to create the Slack command](https://i.imgur.com/AUp2la2.png)

4. Go back to "Basic Information" section under "Settings", and note down the
`Verification Token`. Add this to the `.env` file.

![How to get verification token](https://i.imgur.com/3e1egWI.png)

That's it! Now, from your Slack, you should be able to type `/weather 94109` to
get the latest weather condition of San Francisco! Note that if the command cannot
be found, you might need to re-install the app to your team (a yellow warning sign
should be visible on the API webpage).

![Example for slash command](https://i.imgur.com/0Cgtjk3.png)

## How it works

The app starts an Express web server and answers HTTP post requests from Slack
when each slash command is entered. The HTTP handler then fires another HTTP
request (using the awesome [superagent](https://www.npmjs.com/package/superagent)
package from NPM) to a weather API to get the weather information, and finally sends the
information back to Slack through a unique URL given by the very first HTTP
request from Slack.

## Where to go from here?

Slack slash command is a powerful way to do all kind of things directly from
Slack, and with Postverta it is easy to build and test your commands. Try to
create more commands, and add more corresponding endpoints in `index.js` to
handle them.
