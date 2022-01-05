# G08-Library-Management-System

---

## Project Title: UniLib

###### A web application of a digital academic library for both students and teachers.

---

## Expected Timeline:

## ![Gantt chart](gantt_chart.jpg)

## Feature Description:

### 1. Students and teachers - the users:

- Users can update or delete their accounts. They’ll have a profile with a history of borrowed and returned books. Users will have access to different collections of books.
- They can request, or recommend, or even report about books.
- They can check a book’s availability, the number of total available books. They also may read the first few pages of books. They must issue the hard copies from the admin later. If there are soft copies, they can download these.
- Users can search by book’s name, author’s name, or the subject’s name.
- Users will get notified of recently added books.
- Users can upload notes, books, research papers, or any other soft copies for fellow students. Others may download them.
- Users can post about their academic problems. Others can comment, vote or report the posts. It’ll be free of the admin’s supervision.

### 2. Admins:

- They will conduct the whole system.
- They can look into other users, create accounts for teachers, delete certain user accounts, respond to other users’ problems and solve them, look into reports of the users.
- They can update and categorize the database(removing or adding a book, changing the status of a book).
- They can notify users about their requested books, deadlines, and how to pay for the fine.

## Report on Learning Pre-requisites:

| SL  | Learning Task             | Description                               |                                                                                           Status                                                                                            | Comment                                                           |
| :-: | :------------------------ | :---------------------------------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------- |
|  1  | Web Basics                | Vanilla Javascript, React, Node           | ![ ](https://img.shields.io/badge/Vanilla%20Javascript-Learned-success) ![](https://img.shields.io/badge/React-June%201-critical) ![](https://img.shields.io/badge/Node-June%2015-critical) |
|  2  | UI library and frameworks | Ant Design for React, Next.js, Express.js |               ![](https://img.shields.io/badge/Ant-July%205-9cf) ![](https://img.shields.io/badge/Next-June%2015-9cf) ![](https://img.shields.io/badge/Express-July%201-9cf)                |
|  3  | Database Related          | MySQL                                     |                                                              ![](https://img.shields.io/badge/%20MySQL-December%201-critical)                                                               |
|  4  | Notifications             | Mailgun, Socket.io                        |                            ![](https://img.shields.io/badge/Mailgun-September%2020-important) ![](https://img.shields.io/badge/Socket.io-November%2020-inactive)                            | <ul><li>Mailgun-2018331022</li><li>Socket.io-2018331072</li></ul> |

## #Technologies Used

## Backend:

- Runtime Environment - Node(v14.18.1) ​

- Rest API - Express (v4.17.1) - web framework for Node.js​

- GraphQL - Apollo Client (3.4.17)​

- Sending Mails - MailGun (v0.22.0)​

- Database – ​

- MongoDB Atlas​

- PostgreSQL​

- Storage : (For uploading pdfs) – Firebase(v8.8.1)​

## Frontend:

- User interface – React v17.0.2​

- CSS framework – Bootstrap v5.1.3​

- File Upload-Multer v1.4.4​

- For Creating HTTP requests –Axios v0.22.0​

## #Implemented Features:

Implemented Features:

1. Students and Teachers - the users:

- users can access the library to view all the books
- User can update their account details
- users can access the given pdf link to read the index or first few pages of the books
- users can search books by name/writer’s name and even subject (if given in the \* description).
- users can also check the availability of books in the library and all the other details
- users can see the list of books they have been issued with date and time and details.
- users can search for other users by their name/role /department /email
- users can write posts in forum
- users can delete their posts in forum
- users can update their posts in forum
- users can comment on their and others posts in forum
- users can search out posts of a specific person and also resources from forum
- users can contact admin from forum
- when they return the issued book from library they get a confirmation mail about returning the book.
- all the resources in the forum would be available in one place and students and teachers can upload any type of file in the forum.
- Users can read those uploaded books online and even download them

2. Admin:

- Their account is created by the administrator who has direct access to the database
- admins can log in with the same page as users
- admins can register users directly
- admin can update their account details
- admins can see other users with account
- admins can delete the account of a person if reported and verified fake
- Admin can also delete his own account
- admins can directly contact a user via email from the manage user section
- admins have a separate library
- admins can add new books in the library (with their pdfs and picture of the front page of the book)
- admins can see the details of the books and edit them and delete them
- admins can issue books and see all the issued books in one place.
- admins can search issued book history by issue dates and they can change the book status from issued to returned.
- admins can view all the reports sent to them
- admins can delete reports
- admin can reply to the reports if they consider the report important
- admins can search other users in their list by their name/role /department /email in manage user section

3. Other Features:

- cookie-based authentication
- completely hashed passwords
- protected routes

## #Unimplemented Features:

- User can't delete their accounts.Only admin can.
- Voting (upvoting/downvoting options in the post)

## #Acknowledgement

---

| SL  | Contributors Name | Contribution                                                                                                                                        |
| :-: | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | Antar Roy         | Thanks to him for helping us with his technical advice time to time                                                                                 |
|  2  | Brian Design      | We could understand the basics of react, thanks to his tutorials. [ youtube channel link](https://www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A) |
|  3  | Islem Maboud      | Thanks to him as we solved some of our problems by watching his videos. [ youtube channel link](https://www.youtube.com/coderone)                   |

## #Developers

---

## Group Number:08

## Group Name:Sneaky Stars

| SL  |        Name         | Registration | Cell Number    | Email                    |
| :-: | :-----------------: | :----------- | :------------- | :----------------------- |
|  1  | Nowshin Alam Owishi | 2018331022   | +8801682443570 | nalamowishi999@gmail.com |
|  2  | Tahsina Bintay Azam | 2018331072   | +8801741969665 | tahsina.sheeva@gmail.com |

<p align="center">
<small>&copy; 2021 - Dept. of CSE, SUST, BD</small>
</p>
