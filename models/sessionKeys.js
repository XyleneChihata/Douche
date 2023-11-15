const mongoose = require('mongoose')

const SessionSchema = mongoose.Schema(
        {   
            _id: {
                type: String,
                required: true
            },
            sessionid: {
                type: String,
                required: true
            }
        },
    {
        timestamps:true
    }
);

const SessionKeyDB = mongoose.createConnection('mongodb+srv://DoucheSalon:admin@douchesalon.jqhn28q.mongodb.net/AdminInputs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const SessionKey = SessionKeyDB.model('SessionKey', SessionSchema, 'SessionStorage');

module.exports = SessionKey;