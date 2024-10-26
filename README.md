# HostelHub 
### Live Site Link
- [live site URL](hostel-management-system-ef2f8.web.app)

#### Admin Access
-admin username:Nafi Ahmmed
Password: nafi90



### Key Features
- Authentication and Authorization: Secure login for admins and students with JWT-based protection for sensitive data and route access.
- Meal Management: Admins can add, update, and manage meals by categories ( breakfast, lunch, dinner) with detailed information.
- Subscription Plans: Offers Silver, Gold, and Platinum subscription packages with different benefits for each, including exclusive access to premium features.
- Review System: Students can post, edit, or delete reviews for meals; admins can monitor and manage reviews.
- Meal Request Feature: Subscribed students can request meals, sending requests directly to admin with pending status.
- Upcoming Meals Section: Displays a preview of upcoming meals available to premium users for likes and feedback.
Infinite Scrolling: Automatically loads more meal cards as users scroll, enhancing the browsing experience.
- Protected Routes: Only logged-in users with subscriptions can access certain pages, like meal requests and premium meal options.

### NPM Packages Used
- Express.js: Backend framework for API routes and request handling.
- MongoDB: Database to manage meal, review, and user data.
- Mongoose: For data modeling and interactions with MongoDB.
- Axios: For making API requests between frontend and backend.
- React Router: For page navigation within the app.
- Stripe: For handling secure payments and subscription processing.
- React Query (Tanstack): For data fetching and caching, ensuring smooth data interactions.
- Tailwind CSS & DaisyUI: For a modern, responsive, and visually appealing UI.
- React Hook Form: For efficient and controlled form handling.
- React Toastify: For notifications and feedback on user actions.
Project Updates
- Dynamic Package Checkout: Integrated Stripe checkout pages for Silver, Gold, and Platinum packages with dynamic routing.
- User-Friendly Modals: Implemented interactive modals for actions like borrowing, confirming payments, and deleting reviews.
- Error Handling: Built error-handling logic, including an interceptor to log out users on authentication errors and redirect to login.





