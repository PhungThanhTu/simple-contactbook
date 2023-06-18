import mongoose, { Schema} from 'mongoose';

const contactSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true
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

contactSchema.index({
    'id': "desc"
});
contactSchema.index({
    'name': "text"
});

export const contactModel = mongoose.model('contact', contactSchema, 'contact');