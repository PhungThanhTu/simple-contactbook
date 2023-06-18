import axiosClient from "./axios/axiosClient";

const DEFAULT_PAGINATION_LIMIT = 100;

export async function getContacts(query) {
  const url = `/contact?l=${DEFAULT_PAGINATION_LIMIT}&s=${query}`;
  let contactsRequest = await axiosClient.get(url);
  let contacts = contactsRequest.data.data;
  console.log(contacts);
  if (!contacts) contacts = [];

  return contacts;
}

export async function createContact(contact) {
  const url = `/contact/`
  let contactResponse = await axiosClient.post(url, contact)
  const result = contactResponse.data;
  return result;
}

export async function getContact(id) {
  const url = `/contact/${id}`
  let contactsResponse = await axiosClient.get(url);
  let contact = contactsResponse.data;
  return contact ?? null;
}

export async function updateContact(id, updates) {
  const url = `/contact/${id}`;
  const contactUpdateResponse = await axiosClient.put(url,updates);
  const contact = contactUpdateResponse.data;
  return contact;
}

export async function deleteContact(id) {
  const url = `/contact/${id}`;
  let contactDeleteResponse = await axiosClient.delete(url);
  if(contactDeleteResponse.status === 200)
    return true;
  return false;
}