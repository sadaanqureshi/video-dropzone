import mongoose from "mongoose";

const MONGOURL = process.env.MONGOURL!

if (!MONGOURL) {
    throw new Error("define mongourl");

}

let cache = global.mongoose

if (!cache) {
    global.mongoose = { cnc: null, promise: null }
    cache = global.mongoose
}

export async function connecttodb() {
    if (cache.cnc) {
        return cache.cnc
    }
    else if (!cache.promise) {
        const options={}
        mongoose.connect(MONGOURL,options) 
            .then(() => mongoose.connection)
    }

    try {
        cache.cnc= await cache.promise
    } catch (error) {
        cache.promise=null;
        throw error
    }

    return cache.cnc
}