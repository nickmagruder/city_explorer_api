# CodeFellows - Code 301 Lab 6 - Node, npm, and Express

# Project Name

**Author**: Nick Magruder
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
* 12/7/2020 5:00pm - Repo Created
* 12/7/2020 6:18pm - Server framework built (not yet deployed)
* 12/7/2020 6:49pm - Server running successfully on Heroku
* 12/7/2020 9:15pm - User story 2 complete; successfully pulling data from JSON to front end
* 12/7/2020 10:05pm - Story 3 complete, hosted successfully to Heroku

## Lab 07 Change Log
* 12/8/2020 3:30pm - Story 2, locations, complete


## Credits and Collaborations
### Student Collaborators (provided help collaboratively as group in Remo)
* James Gerstenberger
* Alan Hung
* William Moreno
* Nick Abramowicz

### Resources
* [Stack overflow, push object into an array](https://stackoverflow.com/questions/40250139/push-object-into-array)
* [Stack overflow, npm WARN alert](https://stackoverflow.com/questions/16827858/npm-warn-package-json-no-repository-field)
* [Heroku node.js support](https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version)
* [How to easily set up node environment - Cameron Baughn](https://codeburst.io/how-to-easily-set-up-node-environment-variables-in-your-js-application-d06740f9b9bd)

## Time Estimates

## Lab 6
## Number and name of feature: 1. Repo Set up
* Estimate of time needed to complete: 1hr 30min
* Start time: 5:00pm
* Finish time: 6:49pm
* Actual time needed to complete: 1hr 49min

## Number and name of feature: 2. Locations
* Estimate of time needed to complete: 1hr 30min
* Start time: 7:00pm
* Finish time: 8:00pm
* Start time: 8:30pm
* Finish time: 9:15pm
* Actual time needed to complete: 1hr 45 min

## Number and name of feature: 3. Weather
* Estimate of time needed to complete: 1 hr
* Start time: 9:17pm
* Finish time: 9:45pm 
* Actual time needed to complete: ~30min

## Number and name of feature: 4. Errors
* Estimate of time needed to complete: 
* Start time: 
* Finish time: 
* Actual time needed to complete: 

## Lab 7

## Number and name of feature: 1. Data Formatting
* Estimate of time needed to complete: 1.5 hours
* Start time: 2:15pm
* Finish time: 
* Actual time needed to complete: 

## Number and name of feature: 2. Locations
* Estimate of time needed to complete: 1.5 hours
* Start time: 2:15pm
* Finish time: 3:30pm
* Actual time needed to complete: 

## Assignment Overview
In labs 6 through 9, you will be building a stand-alone back end which will interact with a static front end. You will request data from a total of six third-party APIs, modify the data as needed, and send the data to the client to be displayed in the browser. In labs 8 and 9, you will be persisting data in a SQL database.

Every day you will have a new partner. You and your new partner(s) will spend the first 45 minutes reviewing each other’s code from the previous day and planning out the days work on the whiteboard.

Draw the web request response cycle for the task at hand (about 15 minutes).
Document the data flow: identify inputs and outputs for each part of the cycle.
Outline the functions that support this data flow.
Do a formal code review of each person’s code (15 minutes each).
Open your partner’s GitHub Pull Request on your laptop.
Identify an area in the code that:
you don’t understand
or seams overly complex
or you see a way to improve
or you want more information on
or you really like or think is interesting
Add kind comments or questions inline using the GitHub review feature.
You will then work independently for the rest of the day, implementing your plan, coding in your own repository, submitting your own pull request.

You will have access to view the code base for the client, but will not be able to modify it in any way.

For this lab assignment, you will convert a location entered by the user into a latitude and longitude, then use those values to request weather information for that location. As your City Explorer back end progresses in labs 6 through 9, you will use the latitude and longitude to request information from other APIs from the same search query.

## Workflow
We will be using the Trello project management tool for the duration of this project.
To maximize your experience with Trello, you should create a free Trello account by clicking on the Sign Up button.
After creating an account, go to the City Explorer Trello Board, open the “… Show Menu” link, click the “… More” link, and then click “Copy Board”. Before you create it, be sure to “Change” from Private to “Public” (and click “Yes, Make Board Public”) so your instructional team can see your work. Now, click “Create” to add a copy to your personal account.
This Trello board contains all of the features required to complete this lab assignment.
In the Show Menu tab, click the “Search Cards” link and filter by lab to see the assignment for just the current day
Review the user stories and analyze the feature requests and requirements in the lab.
Within each story, note the acceptance criteria (“Given … When … Then…”) and the checklist of feature tasks. Be careful to execute tasks in order as they are often dependencies of one another.
During the day, check off tasks as you complete them, and move the story cards through the workflow.
Repository set-up
You should create a new repository on GitHub called city_explorer_api.
From this point on, work on semantically-named non-master branches. Once your app is functioning correctly on your branch, make a PR to master and confirm functionality on your deployed site. Your deployed site should not contain any broken functionality.
Heroku deployment
Create an instance on Heroku. Refer to lecture 5 for a reminder of the steps, if needed.
In the Deploy tab, connect your instance to your repository and enable automatic deploys from your master branch. Deploy your application and make sure there are no errors.
Feature Tasks
See the Trello board for your feature tasks for today’s lab.
