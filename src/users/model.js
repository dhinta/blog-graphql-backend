import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "author"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', userSchema);


const UserModel = mongoose.model('User');

const Model = {
    async all () {        
      try {
        const users = await UserModel.find({});
        return users;
      } catch (e) {
        console.log(e);
        return 'Error Processing data';
      }
    },
    async get(id = null) {
      if (id) {
        try {
          const user = await UserModel.findById(id);
          return user;
        } catch (e) {
          console.log(e);
          return 'Error Processing data';
        }
      }
    },
    async save(data = null) {
      try {
        const userDoc = new UserModel({...data});
        const retVal = await userDoc.save();
        return retVal;
      } catch (err) {
        return err;
      }
    }
  };
  
  export default Model;