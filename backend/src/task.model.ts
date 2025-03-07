import mongoose, { Schema, Document} from "mongoose";

interface ITask extends Document {
    title: string;
    description?: string;
    category?: string;
    status: string;
    userId: mongoose.Types.ObjectId
    dueDate?: Date;
}

const taskSchema: Schema = new Schema ({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    status: { type: String, default: 'to do' },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    dueDate: { type: Date }
})

export default mongoose.model<ITask>('Task', taskSchema)