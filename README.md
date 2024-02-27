Prerequisites:

Make sure you have Node.js and npm installed on your machine.
Install ngrok globally https://dashboard.ngrok.com/get-started/setup/macos
Install the Google Cloud SDK to manage your Dialogflow project.
Install the DialogFlow CLI `npm install @google-cloud/dialogflow`

DialogFlow Steps:

1. Go to the Dialogflow console
2. Create a new agent
3. Navigate to the Fulfillment tab and enable the Webhook option
   (set up an external HTTP post endpoint. It allows flexibility in choosing the programming language and platform for implementing the fulfillment)
4. The URL\* section will be the URL to the server handling the requests.

Set up a webhook server

1. set your project directory on your local machine and open up VSCode
2. create a functions directory and cd into your functions directory
3. install node.js by running `npm init -y` to start a new node project
4. install the following dependencies:

   - install express by running `npm install express`
   - install dialogflow fulfillment by running `npm install dialogflow-fulfillment`
   - install dialogflow by running `npm install dialogflow`
   - install actions on google by running `npm install actions-on-google`

5. create a index.js file to test express
6. run index.js by running `node .`
7. deploy your app online by running `ngrok http http://localhost:8080` globally
8. copy the Forwarding url and test in a browser
9. paste the URL in the URL\* section in DialogFlow Fulfillment tab and Save at the bottom
10. define a post request in index.js

Sources:
https://www.youtube.com/watch?v=eUlI8R1u9TE
