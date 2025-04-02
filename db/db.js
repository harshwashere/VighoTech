import mongoose from "mongoose";

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURI)

        if (conn) {
            console.log("DB is connected")
        } else {
            console.log("Can't connect")
        }
    } catch (error) {
        console.error(error)
    }
}

export default connect;