const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, "PLease enter your Username"],
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        perms: {
            type: String,
            default: 'user'
        },
        StyActivity: {
            type: String,
            required: false,
        }
    },
    {
        timestamps:true
    }
);

const UserInputsDB = mongoose.createConnection('mongodb+srv://DoucheSalon:admin@douchesalon.jqhn28q.mongodb.net/UserInputs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const Flow = UserInputsDB.model('User', UserSchema, 'UserData');

module.exports = Flow;