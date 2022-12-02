import mongoose from "mongoose";


const connectDB = async () => {
    return await mongoose.connect("mongodb://localhost:27017/ass9")
        .then(res => console.log(`connected DB `))
        .catch(err => console.log(`Fail toconnected DB `))

}


export default connectDB