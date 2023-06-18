import mongoose, { Schema} from 'mongoose';

const contactSchema: Schema = new Schema({
    id: {
        type: Number,
        default: Date.now,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export const contactModel = mongoose.model('contact', contactSchema, 'contact');