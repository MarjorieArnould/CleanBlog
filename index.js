const express = require('express')
const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const flash = require('connect-flash');
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleWare = require("./middleware/validationMiddleware");
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')


global.loggedIn = null;

app.use(flash());

mongoose.connect('mongodb+srv://Marjorie:Mimine02310@cleanblog.fbt7c.mongodb.net/test',
    { useNewUrlParser: true });

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload());

app.use('/posts/store', validateMiddleWare)
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port, () => {
    console.log('App listening on port 4000 !')
})


app.set('view engine', 'ejs')


app.get('/index', (req, res) => {
    res.render('index');
})
app.get('/posts/new', authMiddleware, newPostController)
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)

app.post('/posts/store', authMiddleware, storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)


app.use((req, res) => res.render('notfound'));