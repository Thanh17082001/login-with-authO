import userModel from '../model/user.model'

class UserService {
    async findByEmail (data){
        return await userModel.findOne(data)
    }

    async create(data){
        return await userModel.create(data)
    }
    async findById(id){
        return userModel.findById(id)
    }
}

module.exports = new UserService;