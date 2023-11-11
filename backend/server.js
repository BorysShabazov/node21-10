const express = require("express");
const  {engine} = require('express-handlebars');
const jwt = require("jsonwebtoken");
const asyncHandler = require("./helpers/asyncHandler");
const UserModel = require("./models/User");
const RolesModel = require("./models/Role");
const bcryptjs = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../config/connectDB");
const invalidUrlError = require("./midllevares/invalidUrlError");
const errorHandler = require("./midllevares/errorHandler");
const authMidllevare = require("./midllevares/authMidllevare");
const sendEmail = require("./services/sendEmail");
const configPath = path.join(__dirname, "..", "config", ".env");
dotenv.config({ path: configPath });
require("colors");
const app = express();

app.use(express.static('public'));
//Set handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'backend/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// реестрація - це зберігання користувача в базу
// анутентифікація - це перевірка данних які надав користувач і порівняння з тими що в базі
// авторизація - це перевірка прав користувача
// логаут - вихід користувача з системи

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/sended', async (req, res) => {


  try {
    res.render('sended', {
    message: 'Contact form send success', name: req.body.userName,
    email: req.body.userEmail
      });
    await sendEmail(req.body);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message
    })
  }
  // res.send(req.body)
});

app.use("/api/v1", require("./routes/carsRoutes"));

//get request for registration
app.get('/register', (req, res) => {
  res.render('register');
})

//Post request for registration
app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // отримуємо і валідуємо данні від користувача
    // шукаємо користувача в базі
    // якщо знайшли викидуємо помилку що такий користувач вже зареестрований
    // якщо не знайшли хешуємо пароль
    // зберігаємо користувача в базу з захешованим паролем

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fils");
    }
    const candedate = await UserModel.findOne({ email });
    if (candedate) {
      res.status(400);
      throw new Error("User alredy exists");
    }
    const hashPassword = bcryptjs.hashSync(password, 5);
    const roles = await RolesModel.findOne({ value: "USER" });
    console.log(roles);
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [roles.value]
    });
    // res.status(201).json({ code: 201, message: "ok", data: { email } });
    res.status(201);
    res.render('registrationSuccess')
  })
);

//get request for login
app.get('/login', (req, res) => {
  res.render('login');
})

//Post request for login
app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // отримуємо і валідуємо данні від користувача
    // шукаємо користувача в базі і розшифровуємо пароль
    // якщо не знайшли або не розшифрували пароль кидаємо помилку "invalid login or password"
    // якщо знайшли і розшифрували пароль видаємо токен
    // зберігаємо користувача в базу з токеном

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fils");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("invalid login or password");
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      res.status(400);
      throw new Error("invalid login or password");
    }

    const token = generateToken({
      students: ["Borys", "Andrii", "Oksana"],
      id: user._id,
      roles: user.roles
    });

    user.token = token;
    await user.save();

    // res.status(200).json({ code: 200, message: "ok", data: { email, token } });
    res.status(200);
    res.render('loginSuccess')
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "cat", { expiresIn: "23h" });
}

app.patch(
  "/logout",
  authMidllevare,
  asyncHandler(async (req, res) => {
    // ми отримуємо данні від користувача
    // скидаємо токен
    const { id } = req.user;
    const user = await UserModel.findById(id);
    user.token = null;
    await user.save();
    res.status(200).json({ code: 200, message: "logout seccess" });
  })
);

app.use("*", invalidUrlError);

app.use(errorHandler);

const { PORT } = process.env;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is runin ${PORT}`.green.italic.bold);
});
