require('dotenv').config();

const mongoDbUri = process.env.MONGO_URL ;
const dbName = "crmapp-db";
module.exports = { mongoDbUri, dbName };