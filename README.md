# Document Management System

Document Management System is a react redux baed application that allows users manage ( create and edit ) documents

# Development

The application was developed with NodeJs while using Express for routing. The Postgres database was used with sequelize as the ORM.

# Application Features

User Authentication

Users are authenticated and validated us JWT web token. Generating tokens on signup and login ensures documents and API endpoints are protected.

# Document Management

## User
Create an account
Login with your credentials
Create new document
Edit Documents
Delete documents
View public documents created by other users.
View documents created by his access group with access level set as role.
Search a users public documents.
View public and role access level documents of other regular users.
Logout

## Admin
View all users.
View all created documents except documents with access set to private.
Delete any user.
Update any user's record.
Create a new role.
View all created roles.
Search for any user.

#Installation

Ensure you have NodeJs and postgres installed
Clone the repository git clone git@github.com:andela-mabdussalam/document-management-system.git
Change your directory cd document-management-system
Install all dependencies $ npm install


#Usage

Run DB Migrate command with sequelize db:migrate
Seed you DB by running this command npm run db:seed, this seeds Admin Role and Regular Role.
Run npm run start:dev to start the application on development environment

#Testing

Run DB migrate command with npm run db:migrate:test.
Run Test npm test
You can undo your migrations by running this command db:migrate:undo:all

[Use the app here](https://documentmanager1.herokuapp.com/)

[Check out the documentation here](https://andela-mabdussalam.github.io/slate/)
