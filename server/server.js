const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { faRetweet } = require("@fortawesome/free-solid-svg-icons");
const cookieParser = require("cookieparser");
const connectDB = require("./db/db_user");
const User = require("./model/model_user");
const Book = require("./model/model_books");
const Message = require("./model/model_messages");
const Report = require("./model/model_report");
const AddImg = require("./model/model_image");
const IssueTrack = require("./model/model_admin_issue");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "./config.env"),
});
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox789f2766fe984c6a9bfa9978ecc7d9f7.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
const multer = require("multer");
const client = require("./db/graphql");
const { gql } = require("@apollo/client");
const { INSERT_USER } = require("./db/graphql/gql");

const app = express();

connectDB();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "./public/"));
app.use(express.static(__dirname + "./server/public/"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/userinfo", (req, res) => {
  res.send("list of all task");
});

const checkParamsIfExists = (params) => (req, res, next) => {
  const { body } = req;
  const missingKeys = [];
  for (const param of params) {
    if (!(param in body)) {
      console.log({ param });
      missingKeys.push(param);
    }
  }
  if (missingKeys.length !== 0) {
    res.json({
      status: "params missing",
      params: missingKeys.toString(),
    });
    return;
  }
  next();
};

app.post(
  "/register",
  checkParamsIfExists([
    "name",
    "email",
    "registration",
    "department",
    "session",
    "password",
  ]),
  async (req, res) => {
    const { name, email, registration, department, session, password, id } =
      req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = jwt.sign(
      {
        name,
        email,
        registration,
        department,
        session,
        password: hashedPassword,
        id,
      },
      process.env.JWT_ACC_ACTIVATE,
      { expiresIn: "200m" }
    );

    //console.log(`${process.env.CLIENT_URL}/authentication/activation/${token}`);

    const dataMail = {
      from: "Noreply@Unilib.com",
      to: req.body.email,
      subject: "UNILIB ACCOUNT ACTIVATION",
      html: `
        <h2>Please click on this link to activate your account</h2>
        <p>${process.env.CLIENT_URL}/authentication/activation/${token}</p>
        `,
    };
    mg.messages().send(dataMail, function (error, body) {
      if (error) {
        return res.json({
          message: error.message,
        });
      } else res.json({ message: "Email has been sent, kindly activate your account" });
    });
  }
);

app.post(
  "/activateAccount",
  checkParamsIfExists(["token"]),
  async (req, res) => {
    const { token } = req.body;
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      async function (err, decodedToken) {
        if (err) {
          return res.status(400).json({ error: "Incorrect or Expired link" });
        }
        const { name, email, registration, department, session, password } =
          decodedToken;
        let user = await User.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ error: "User with this email already exists" });
        }

        client
          .mutate({
            mutation: INSERT_USER,
            variables: {
              department,
              session,
              email,
              name,
              registration: Number(registration),
            },
          })
          .then(async (result) => {
            user = new User({
              name,
              email,
              registration,
              department,
              session,
              password,
              id: result.data.insert_users.returning[0].id,
            });
            await user.save();
            res.json({
              message: "successful",
            });
          })
          .catch((err) => console.log({ err }));
      }
    );
  }
);

app.post(
  "/login",
  checkParamsIfExists(["email", "password"]),
  async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email,
      },
      "secret"
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ token: token, id: user.id });
  }
);

const checkTokenMiddleware = (req, res, next) => {
  const { headers } = req;
  const token = req.headers["authorization"];
  console.log({ token });
  // const { token } = req.headers;
  try {
    const data = jwt.verify(token, "secret");
    req.user = data;
    next();
  } catch (err) {
    res.status(401).json({
      message: "invalid token",
    });
  }
};

app.get("/user", checkTokenMiddleware, async (req, res) => {
  console.log({ user: req.user });
  const data = await User.findOne({ _id: req.user._id });

  res.json({ message: "successful", data });
});

app.get("/user/:email", async (req, res) => {
  const data = await User.findOne({ email: req.params.email });

  res.json({ message: "successful", data });
});

app.get("/allusers", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
});

app.delete("/api/delete/user/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ mgs: "User entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such user" }));
});

app.put("/api/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

app.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nobookfound: "No user found" }));
});

app.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "success",
  });
});

app.post("/addbook", upload.single("image"), async (req, res) => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();
  let issueDate = year + "-" + month + "-" + date;
  let issueTime = hours + ":" + minutes;
  req.body.image = req.file.path;
  const book = new Book({
    bookName: req.body.bookName,
    writer: req.body.writer,
    pdfLink: req.body.pdfLink,
    image: req.file.originalname,
    number: req.body.number,
    text: req.body.text,
    date: issueDate,
    time: issueTime,
  });

  const result = await book.save();

  const { bookName, ...data } = await result.toJSON();

  res.send(data);
});

// @route GET api/books
// @description Get all books
// @access Public
app.get("/allbooks", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
app.get("/api/books/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobookfound: "No Book found" }));
});

app.put("/api/books/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
app.delete("/api/books/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
});

app.post("/messages", async (req, res) => {
  const sentMessage = new Message({
    message: req.body.message,
  });
  const result = await sentMessage.save();
  const { message, ...data } = await result.toJSON();
});

app.post("/issue-book", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();
  let issueDate = year + "-" + month + "-" + date;
  let issueTime = hours + ":" + minutes;
  var issue = {
    issue_date: issueDate,
    issue_time: issueTime,
    issued_book: req.body.book,
  };
  User.findOneAndUpdate(
    { email: req.body.email },
    { $push: { books: issue } }
  ).then((error) => {
    res.send(error);
  });

  const admin_issue = new IssueTrack({
    issue_date: issueDate,
    issue_time: issueTime,
    issued_book: req.body.book,
    issued_user: req.body.email,
    status: "issued",
  });
  const result = await admin_issue.save();
  const { issue_date, ...data } = await result.toJSON();
});

app.post("/reports", async (req, res) => {
  const sentReport = new Report({
    type: req.body.type,
    body: req.body.body,
    user_email: req.body.email,
  });
  const result = await sentReport.save();
  const { type, ...data } = await result.toJSON();
});

app.post("/addImage", upload.single("image"), async (req, res) => {
  req.body.image = req.file.path;
  const img = new AddImg({
    email: req.body.email,
    id: req.body.id,
    image: req.file.originalname,
  });

  const result = await img.save();

  const { email, ...data } = await result.toJSON();

  res.send(data);
});
app.get("/img/:email", async (req, res) => {
  /*AddImg.findOne({ email: req.params.email })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ noimagefound: "No image found" }));*/
  const data = await AddImg.findOne({ email: req.params.email });
  if (data === null) {
    res.status(400).json("not have image");
  } else res.json({ message: "successful", data });
});

app.post("/api/admin/send-email", async (req, res) => {
  //console.log(req.body.id);
  //const user = User.findById(req.body.id);
  console.log(req.body);
  const dataMail = {
    from: "Noreply@Unilib.com",
    to: req.body.email,
    subject: req.body.subject,
    html: `
      <h2>Hello there! Contacting you from unilib :)</h2>
      <p>${req.body.message}</p>
      `,
  };
  await mg.messages().send(dataMail, function (error, body) {
    if (error) {
      return res.json({
        message: error.message,
      });
    } else res.json({ message: "Email has been sent, kindly activate your account" });
  });
});

app.get("/allreports", (req, res) => {
  Report.find()
    .then((reports) => res.json(reports))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
});

app.delete("/api/delete/report/:id", (req, res) => {
  Report.findByIdAndRemove(req.params.id, req.body)
    .then((report) => res.json({ mgs: "Report entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a report" }));
});

app.post("/register-teacher", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    department: req.body.department,
    session: req.body.session,
    password: hashedPassword,
  });

  const result = await user.save();

  const { name, ...data } = await result.toJSON();

  res.send(data);
});

app.listen(4000, () => {
  console.log("running on port 4000");
});

module.exports = app;
