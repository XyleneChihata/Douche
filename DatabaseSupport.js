// const { MongoClient } = require('mongodb');

// const mongoURL = 'mongodb+srv://DoucheSalon:admin@douchesalon.jqhn28q.mongodb.net/?retryWrites=true&w=majority';


// async function connectToDatabases() {
//     try {
//         const client = await MongoClient.connect(mongoURL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         const db1 = client.db('AdminInputs');
//         const db2 = client.db('UserInputs');

//         console.log('Connected to databases on localhost successfully');
//         return { db1, db2 };
//     } catch (error) {
//         console.error('Error occurred while connecting to databases on localhost: ', error);
//         throw error;
//     }
// }

// module.exports = { connectToDatabases };