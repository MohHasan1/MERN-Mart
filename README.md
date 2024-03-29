# MERN-Mart

This is an e-commerce web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The app allows users to register, log in, and log out securely using JWT authentication. Users can also edit their profiles. The app uses Mongoose to connect with MongoDB, Express.js and Node.js for the backend, and React for the frontend. Bootstrap is used for the UI, with Sass for customization. Redux is used for API calls and state management. The app implements routing and uses react-toastify for popups.

## Description

The E-Commerce App is a full-fledged e-commerce platform designed to provide users with a seamless shopping experience. From browsing products to making secure payments, the app offers a range of features to enhance the shopping experience. Users can register, log in, and log out securely using JWT authentication. They can edit their profiles, browse products, add items to their cart, and proceed to checkout. The app uses Mongoose to connect with MongoDB, ensuring efficient data storage and retrieval. The frontend is built using React, providing a responsive and interactive user interface. Bootstrap and Sass are used for styling, and Redux is used for state management. This project is the first big project I made after learning the MERN stack, and it represents a significant milestone in my learning journey as a developer.

## Screenshots
![Screenshot 1](screenshots/home.png)
![Screenshot 2](screenshots/product.png)
![Screenshot 3](screenshots/login.png)
![Screenshot 5](screenshots/cart.png)
![Screenshot 4](screenshots/order.png)
![Screenshot 6](screenshots/ship.png)

## Technologies Used

- **Frontend**: React, Bootstrap, Sass, Redux
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: HTTPS-only cookie, bcryptjs for password hashing
- **Payment Integration**: PayPal
- **State Management**: Redux
- **Other Libraries**: react-toastify for popups

## Development Tools Used

- **Sass**: Used for customizing Bootstrap styles.
- **Nodemon**: Used for automatically restarting the server during development.
- **Concurrently**: Used for running multiple commands concurrently, such as the frontend and backend servers.

## Features

- **User Registration and Authentication**: Users can register, log in, and log out securely using JWT.
- **Profile Editing**: Users can edit their profile information.
- **HTTPS-only Cookie**: Secure communication with the server using HTTPS-only cookies.
- **Product Management**: Add, edit, and delete products.
- **Shopping Cart**: Add products to the cart and manage cart items.
- **Checkout Process**: Secure checkout process with order summary and payment integration.
- **User Profile**: View and update user profile information.
- **Product Reviews**: Allow users to leave reviews for products.
- **Search Functionality**: Search for products based on keywords.
- **Responsive Design**: Mobile-friendly design for a seamless user experience on all devices.

## Getting Started

1. Clone this repository.
2. Install dependencies using `npm install` in both the frontend and the main folder(backend) directories.
3. Set up your MongoDB database and configure the connection in the server.
4. Run `npm run dataImport` to add data to the database from the product JSON file.
5. Run the development server using `npm start dev` server directory.
6. Open `http://localhost:5173` in your browser to access the app.

## Future Improvements

- Implement an admin page and functionality to add products.
- Implement more payment gateways for additional payment options.
- Enhance product search functionality with filters and sorting options.
- Implement user reviews and ratings for products.
- Add more categories and subcategories for products.
