import { FilterQuery } from "mongoose";
import { contactModel } from "../models/contact.model";
import { LoadContactById, LoadContacts } from "../queries";
import { ITimestampLazyLoadingPagination } from "../types";
import logger from "../utils/logger";

const CONTACT_SELECTED_FIELD = "-_id id name phoneNumber email"

const get = async (query: LoadContacts, pagination: ITimestampLazyLoadingPagination) => {

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

		const findParams: FilterQuery<{ [x: string]: any; }> = {
			// $text: {
			// 	$search: name,
			// 	$caseSensitive: false
			// },
			name: {
				$regex: name,
				$options: 'i'
			},
			id: {
				$lt: latestTimeStamp - 1
			}
		};

		const sortParams: Record<string, | 1 | -1 | {$meta: "textScore"}> = {
			id: -1
		}

    const contacts = await model
		.find(findParams)
    	.sort(sortParams)
		.limit(limit)
		.select(CONTACT_SELECTED_FIELD);
	const oldestContact = [...contacts].pop();
	const nextTimeStamp = oldestContact?.id;

    return {
		data: contacts,
		limit: limit,
		next: nextTimeStamp
	};
}

const getById = async (query: LoadContactById) => {
	const model = contactModel;
	const id = query.id;

	const filterQuery = {
		id: id
	}

	const contact = await model
		.findOne(filterQuery)
		.select(CONTACT_SELECTED_FIELD);

	return contact;
}

export default {
	get,
	getById
}