import mongoose from 'mongoose'

export const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Mongodb Connected")
    } catch (error) {
        console.log(`While Connecting DB Error Contains ${error}`)
        process.exit(1)
    }
}