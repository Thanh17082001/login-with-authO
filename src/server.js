import express from 'express'
import connectDb from './config/db'
import expressSession from 'express-session';
import router from './router/index'
import dotenv from 'dotenv'
const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json());

dotenv.config()
// express session
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// connect database
connectDb()

// init router

router(app)


app.listen(3000, () => console.log('server running with post 3000'))