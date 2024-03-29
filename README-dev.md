# Prerequisites:

1. Install [Node.js](https://nodejs.org/en)
2. Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install-sdk), which allows you to interact with gcloud from your local machine
3. Install the DialogFlow CLI `npm install @google-cloud/dialogflow`, which is a Cloud Client Library.

# Create a DialogFlow Agent:

1. Go to the Dialogflow console
2. Create a new agent (this will create a project on GCP)
3. Navigate to the Fulfillment tab and enable the Webhook option
   (set up an external HTTP post endpoint. It allows flexibility in choosing the programming language and platform for implementing the fulfillment)
4. The URL section will be the URL to the server handling the requests.

# Getting started with App Engine:

App Engine: A fully managed platform-as-a-service (PaaS) for deploying websites and APIs. App Engine expects your application to be able to handle requests on the port specified by the process.env.PORT variable.

1. Go to Google Cloud Console
2. Select the project
3. Go to the App Engine Dashboard
4. Create an application
5. Select region (us-west1)
6. Select Node.js as the language and keep standard environment

# Creating a Service Account:

1. Navigate to IAM and Admin and select Service Accounts
2. At the top, select Create Service Account
3. Give it a name, such as "dialogflow", then click Create and Continue
4. Give it the "DialogFlow API Admin" role and click Continue
5. Click Done
6. Click on the three dots under Actions and select Manage Keys
7. Select Add Key of type JSON and then Create
8. Add the file to your project directory and make sure you add it to .gitignore because it is a confidential file.

# Setting up a webhook server:

1. Set up your project directory on your local machine and open up VSCode
2. Initialize a new node project by running`npm init -y`
3. Install the following dependencies:

   - install the webframe work Express by running `npm install express`
   - install dialogflow fulfillment by running `npm install dialogflow-fulfillment`
   - install dialogflow by running `npm install dialogflow`
   - install actions on google by running `npm install actions-on-google`
   - install CORS for security by running `npm install cors`

4. Create an app.yaml file, to deploy to App Engine
   - ensure the nodejs version matches by running `node --version`
   ```
   # [START app_yaml]
   runtime: nodejs20
   ```
6. Create a src directory
7. Create an index.js file inside the src directory
8. Update package.json to include:
   ```
   "scripts": {
      "start": "node ./src/index.js",
      "deploy": "gcloud app deploy"
   }
   ```
9. Execute the app by running `npm start`
10. Use the tool Insomnia to test the app

# Deploy the app:

1. Load a new terminal window in VSCode
2. Run `gcloud init` and select your project
3. run `gcloud app deploy` to deploy your application or run `npm run deploy`
4. Run `gcloud app browse` or copy and paste the url to the web browser
5. Copy the URL to the DialogFlow Console Fulfillment

# Debugging:

1. To debug errors, run `gcloud app logs read`
2. It's also helpful to use [ngrok](https://dashboard.ngrok.com/get-started/setup/macos) to see your console logs in VSCode
3. Instead of using gcloud, deploy your app online by running `ngrok http http://localhost:8080` globally
4. Copy the Forwarding url and test in a browser
5. Copy the URL to the DialogFlow Console Fulfillment

# Sources:

https://cloud.google.com/appengine/docs/an-overview-of-app-engine
https://cloud.google.com/appengine/docs/standard/nodejs/building-app
https://www.youtube.com/watch?v=eUlI8R1u9TE
