import express, {NextFunction, Request, Response} from "express";
import { DeleteContact, InsertContact, UpdateContact } from "../mutations";
import contactMutationHandler from "../mutationHandlers/contact.handlers";
import contactQueryHandler from "../queryHandlers/contact.handlers";
import { ITimestampLazyLoadingPagination } from "../types";
import { LoadContactById, LoadContacts } from "../queries";
const router = express.Router();

const getContactById = async (id: number) => {
    const loadContactById: LoadContactById = {
        id: id
    }

    const result = await contactQueryHandler.getById(loadContactById);
    
    return result;
}

router.post('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = Date.now();
        const mutation: InsertContact = {
            id,
            ...req.body
        };
        await contactMutationHandler.insert(mutation);
    
        res.status(201).json(mutation);
    }
    catch (err) {
        next(err)
    }

});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let search = '';
        if(req.query.s) {
            if(typeof req.query.s !== 'string')
            {
                throw new Error("Invalid search query parameter")
            }
            search = req.query.s.toString();
        }
        const limit = Number(req.query.l);
        const lastTimeStamp = Number(req.query.t);

        const pagination: ITimestampLazyLoadingPagination = {
            limit: limit,
            latestTimeStamp: lastTimeStamp,
            
        }

        const query: LoadContacts = {
            name: search
        }

        const result = await contactQueryHandler.get(query, pagination);

        return res.status(200).json(result);
    }
    catch (err)
    {
        next(err)
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
    
        const result = await getContactById(id);

        if(!result) {
            res.sendStatus(404);
            return;
        }

        return res.status(200).json(result)
    }
    catch (err)
    {
        next(err)
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const updateContactRequestBody = req.body;
    
        const result = await getContactById(id);

        if(!result) {
            res.sendStatus(404);
            return;
        }

        const updateContactMutation: UpdateContact = {
            ...updateContactRequestBody,
            id
        }

        await contactMutationHandler.update(updateContactMutation)

        return res.status(200).json(updateContactMutation)
    }
    catch (err)
    {
        next(err)
    }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const updateContactRequestBody = req.body;
    
        const result = await getContactById(id);

        if(!result) {
            res.sendStatus(404);
            return;
        }

        const deleteContactMutation: DeleteContact = {
            id
        }

        await contactMutationHandler.remove(deleteContactMutation)

        return res.sendStatus(200);
    }
    catch (err)
    {
        next(err)
    }
})

export default router;