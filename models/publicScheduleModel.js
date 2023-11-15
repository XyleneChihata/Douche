const mongoose = require('mongoose')

const publicScheduleSchema = mongoose.Schema(
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

const AdminScheduleDB = mongoose.createConnection('mongodb+srv://DoucheSalon:admin@douchesalon.jqhn28q.mongodb.net/AdminInputs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const publicSchedule = AdminScheduleDB.model('PublicSchedule', publicScheduleSchema, 'PublicSchedule');

module.exports = publicSchedule;