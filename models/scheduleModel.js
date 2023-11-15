const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema(
    {   
        _id: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        package: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        stylist: {
            type: String,
            required: false,
        }
        
},
    {
        timestamps:true
    }
);

const UserRequestDB = mongoose.createConnection('mongodb+srv://DoucheSalon:admin@douchesalon.jqhn28q.mongodb.net/UserInputs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const Schedule = UserRequestDB.model('Schedule', scheduleSchema, 'UserRequest');

module.exports = Schedule;