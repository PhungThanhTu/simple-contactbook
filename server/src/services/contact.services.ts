import { contactModel } from "../models/contact.model";
import { ContactQuery } from "../queries";
import { ITimestampLazyLoadingPagination } from "../types";
import logger from "../utils/logger";

const getContacts = async (query: ContactQuery, pagination: ITimestampLazyLoadingPagination) => {

    const model = contactModel;
    const name = query.name;
    const limit = pagination.limit;

    let latestTimeStamp = pagination.latestTimeStamp;

    if(!limit) {
        const error = "Please specify the nunber of contacts to be queried"
        logger.error(error);
        throw new Error(error);
    }

    if(!latestTimeStamp) {
        latestTimeStamp = Infinity;
    }


    await model.find({
        
    })
}