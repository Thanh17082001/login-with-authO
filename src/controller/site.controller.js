class siteController{
    homepage(req , res){
        res.json(req.session.auth)
    }
    search(){{
    }}
}

module.exports = new siteController