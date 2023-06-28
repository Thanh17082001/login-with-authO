import siteController from "../controller/site.controller";
import userRoute from './user.route'
const router = (app) =>{
    app.use('/user',userRoute)
    app.use('/',siteController.homepage)
}

module.exports= router;