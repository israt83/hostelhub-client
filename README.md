

## HostelHub
HostelHub is a comprehensive platform tailored for School, College, University hostel meal management. It enables students to browse, like, and request meals, while admins can add, update, and manage meal requests and track payment history. Secure authentication, responsive design, and robust admin tools make HostelHub ideal for both students and administrators.

## Live site url
https://hostelhub-1b756.web.app


## Server site repo
https://github.com/israt83/hostelhub-server


## Admin idp
- email: hostelhub@gmail.com
- pass: hostel90

## Key Features

 - Displays upcoming meals: only premium users can like meals.
 - Admin Meal Management: Add, update meal statuses, and manage requests.
 - Payment History: Displays payment history with relevant messages.

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Express,JWT
- Database: MongoDB
- Authentication: Firebase



## Running the Project Locally

1- Clone the cleint site repo repository:
- git clone https://github.com/israt83/hostelhub-client.git
- cd hostelhub
- npm i
2- Set up Firebase for authentication and paste your own credential in firebase.config file.

3- Clone the server site repo repository:
 - git clone https://github.com/israt83/hostelhub-server.git
 - set up dependencies : npm i
 - Set up MongoDB
 - Set up MongoDB Atlas or run a local instance.
 - Add your MongoDB connection URI located in index file

- npm run dev in client site  then Open your browser and navigate to http://localhost: port
- if you want run server as well then write this command in terminal  nodemon index.js , and paste the port in browser



