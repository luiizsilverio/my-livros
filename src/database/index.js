import mongoose from "mongoose";

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DATABASE } = process.env;

const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.4yzqzww.mongodb.net/${MONGODB_DATABASE}`;

mongoose.connect(url);

let db = mongoose.connection;

export default db;
