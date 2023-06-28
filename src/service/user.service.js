import userModel from '../model/user.model'

class UserService {
    async findByEmail (email){
        return await userModel.findOne({email})
    }

    async create(data){
        return await userModel.create(data)
    }
}

module.exports = new UserService;