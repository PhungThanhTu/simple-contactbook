import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {

    logger.error(`Unhandled ExceptionThrown: ${err.message}`)
    logger.error(err.stack!);
    logger.error(`At ${req.path}`);
    logger.error(`Params: ${JSON.stringify(req.params, null, 2)}`);
    logger.error(`Body: ${JSON.stringify(req.body, null, 2)}`);
    logger.error(`Queries: ${JSON.stringify(req.query, null, 2)}`);

    res.status(400).send("Unknown error occured");
}

export default handleError;