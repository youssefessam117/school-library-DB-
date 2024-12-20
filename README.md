﻿# school-library-DB-

### Overview
This project is a back-end library application developed using Node.js with Express and MongoDB as the database. The application allows users to sign up, log in, and manage their library activities such as issuing (borrowing) books for a specified duration. A fee will be applied if a user fails to return a book within the designated time.


### Features
#### User Management
- **Sign Up:** Users can create an account by providing necessary details and registering with the application.
- **Login:** Registered users can log in to access their account and library functionalities.
- **Email Verification:** A verification process is implemented to ensure the validity of user email addresses.
- **Update User:** Users have the ability to update their profile information, such as name, contact details, and password.
- **Delete User:** Users can choose to delete their account and associated data from the application.
- **Get User:** Users can view their profile information and library records.

#### Book Management
- **Add Book:** Admin users can add new books to the library by providing title, author, and genre details.
- **Search Book:** Users can search for books based on various criteria, such as title, author, or genre.
- **Issue Book:** Users can issue books for a specified duration, marking them as borrowed from the library.
- **Return Book:** Users can mark a borrowed book as returned once they have returned it to the library.
- **Get All Books:** Users can view a list of all available books in the library.
- **Get Non-Returned Books:** Users can see a list of books that are currently borrowed and not yet returned.
- **Get Book By ID:** Users can retrieve detailed information about a specific book using its unique identifier.

#### Password Management
- **Forget Password:** Users who forget their password can initiate a password reset by providing their email address.
- **Reset Password:** Users receive an email with instructions on how to reset their password after initiating the password reset process.

### Technologies Used
- **Backend:** Node.js, Express
- **Database:** MongoDB
