import express from 'express'
import connectDb from './config/db'
import expressSession from 'express-session';
import router from './router/index'
import passport from 'passport';
import dotenv from 'dotenv'
import cors from 'cors'


const app = express()


app.use(cors({credentials: true, origin: 'http://localhost:8080'}))


app.use(express.urlencoded({extended: true}));
app.use(express.json());

dotenv.config()
// express session

app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// app.use(passport.authenticate('google'))
app.use(passport.initialize());
app.use(passport.session());

// connect database
connectDb()

// init router

router(app)


app.listen(3000, () => console.log('server running with post 3000'))