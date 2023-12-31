import { 
  Form, 
  useLoaderData,
  redirect,
  useNavigate } from "react-router-dom";
import { updateContact } from "../contact";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="name"
          defaultValue={contact.name}
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="email"
          placeholder="test@gmail.com"
          defaultValue={contact.email}
        />
      </label>
      <label>
        <span>Phone Number</span>
        <input
          placeholder="0999999999"
          aria-label="Phone Number"
          type="text"
          name="phoneNumber"
          defaultValue={contact.phoneNumber}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button 
          type="button"
          onClick={() => {
            navigate(-1);
          }}>Cancel</button>
      </p>
    </Form>
  );
}