import { contactModel } from "../models/contact.model";
import { DeleteContact, InsertContact, UpdateContact } from "../mutations";
import { IContact } from "../types";


const insert = async (mutation: InsertContact) => {
    await contactModel.create(mutation);
}

const update = async (mutation: UpdateContact) => {
    const filterQuery = {
        id: mutation.id
    };

    const updateQuery: IContact = {
        name: mutation.name,
        phoneNumber: mutation.phoneNumber,
        email: mutation.email
    };
    await contactModel.findOneAndUpdate(filterQuery, updateQuery);
    return;
}

const remove = async (mutation: DeleteContact) => {
    const filterQuery = mutation;

    await contactModel.deleteOne(filterQuery);
    return;
}

export default {
    insert,
    update,
    remove
}