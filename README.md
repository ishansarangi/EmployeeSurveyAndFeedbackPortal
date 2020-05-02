# EmployeeSurveyAndFeedbackPortal
This is a portal for the employees to manage and view their surveys, compare the results with the organization and even provide anonymous feedback to the management.


## UI

## Available Scripts

In the project's UI directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Backend
## Spring Boot Server
In the project's backend/EmlpoyeeFeedback directory, you can run:
### `mvn clean install package`

Once the source is built. Run the command to start the backend spring boot server.
### `java -jar target/EmployeeFeedback-0.0.1-SNAPSHOT.jar`

## Release Notes

- v1.0.0
  - Search functionality added to search through tags, thread subject and messages.
  - Managers can remove their tags from the threads. 
  - Managers can differentiate between a read and unread message. 
  - Employees can view their manager hierarchy to send a feedback message. 
  - Sorting threads in reverse chronological order.
  - Several important bug fixes.

- v0.5.0
  - Managers can create new tags.
  - Managers can add a tag to a message thread from an employee.
  - Managers can delete an already added tag.
  - Managers can filter employee feedback message threads by tags.
  - Employees and managers can search through their feedback message threads.
  - Several bug fixes

- v0.4.0
  - Manager can now switch between their own feedbacks and feedback from emplyees who report to them.
  - Added functionality to show limited info in manager viewto show only relevant info.
  - Added a login component to save the user in the context by calling the graphQL API.
  - Integrated backend with graphQL
  - Fixed several UI styling issues
  
- v0.3.0
  - Save messages and update thread in database
  - Added Message subject and recipient name to the discussion pane
  - Added sender's name and date-time to each message bubble
  - Added functionality to change the UI based on user type
  - Fixed several UI styling issues

- v0.2.0
  - New Manager Pane
  - List view of threads of all sent messages
  - Chat view for viewing/sending messages in the respective message thread
  - Able to switch between manager and employee view
  - Manger can view his feedback as an employee as well as the feedbacks sent to him by the employees reporting to him.
  
- v0.1.0
  - Create new message button
  - New message dialog box with title, subject and message body
  - Send and cancel button for new message
