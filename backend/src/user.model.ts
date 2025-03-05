import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    email: string,
    password?: string;
}

const userSchema: Schema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, unique: true},
})

export default mongoose.model<IUser>('User', userSchema)