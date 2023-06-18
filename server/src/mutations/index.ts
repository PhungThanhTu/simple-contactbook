import { IContact, IIDentifiable } from "../types";

export interface InsertContact extends IContact, IIDentifiable
{}

export interface UpdateContact extends IContact, IIDentifiable {}

export interface DeleteContact extends IIDentifiable {}