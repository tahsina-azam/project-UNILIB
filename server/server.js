const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { faRetweet } = require("@fortawesome/free-solid-svg-icons");
const cookieParser = require("cookieparser");
const connectDB = require("./db/db_user");
const User = require("./model/model_user");
const Book = require("./model/model_books");
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
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
    const { name, email, registration, department, session, password } =
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
      },
      process.env.JWT_ACC_ACTIVATE,
      { expiresIn: "200m" }
    );

    console.log(`${process.env.CLIENT_URL}/authentication/activation/${token}`);

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

app.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.cookie.Clear();
  res.send({
    message: "success",
  });
});

app.post("/addbook", upload.single("image"), async (req, res) => {
  req.body.image = req.file.path;
  const book = new Book({
    bookName: req.body.bookName,
    writer: req.body.writer,
    pdfLink: req.body.pdfLink,
    image: req.body.image,
    number: req.body.number,
    text: req.body.text,
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

app.listen(4000, () => {
  console.log("running on port 4000");
});

module.exports = app;
