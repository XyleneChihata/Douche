const mongoose = require('mongoose')

const SessionSchema = mongoose.Schema(
        {   
            _id: {
                type: String,
                required: true,
            },
            Price: {
                type: String,
                required: true,
            },
            Description: {
                type: String,
                required: true,
            },
            Quantity: {
                type: String,
                required: true,
            },
            IsShown: {
                type: String,
                required: true,
            }
        },
    {
        timestamps:true
    }
);

const InventoryDB = mongoose.createConnection('mongodb+srv://DoucheSalon:admin@douchesalon.jqhn28q.mongodb.net/AdminInputs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const Inventory = InventoryDB.model('Inventory', SessionSchema, 'InventoryData');

module.exports = Inventory;