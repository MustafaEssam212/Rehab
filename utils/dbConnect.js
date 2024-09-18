import mongoose from 'mongoose';


const MongoUrl = process.env.MONGO_URL;

if(!MongoUrl){
    throw new Error('No Mongo URL')
}

let cached = global.mongoose

if (!cached){
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

async function dbConnect(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: false,
        }
        mongoose.set('strictQuery', false);
        cached.promise = mongoose.connect(MongoUrl, opts).then((mongoose) => {
            return mongoose
        })
    }

    cached.conn = await cached.promise

    return cached.conn
}

export default dbConnect