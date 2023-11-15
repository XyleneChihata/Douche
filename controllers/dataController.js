// controllers/dataController.js
const Data = require('../models/dataModel');

const dataStore = [];

const createData = (content) => {
    const id = dataStore.length + 1;
    const newData = new Data(id, content);
    dataStore.push(newData);
    return newData;
};

const getAllData = () => {
    return dataStore;
};

module.exports = {
    createData,
    getAllData,
};