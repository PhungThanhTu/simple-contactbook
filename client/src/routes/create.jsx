import { 
  Form, 
  redirect,
  useNavigate } from "react-router-dom";
import { createContact } from "../contact";

export async function action({ request }) {
  const formData = await request.formData();
  const contact = Object.fromEntries(formData);
  const result = await createContact(contact);
  const id = result.id;
  return redirect(`/contacts/${id}`);
}

export default function CreateContact() {
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
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="email"
          placeholder="test@gmail.com"
        />
      </label>
      <label>
        <span>Phone Number</span>
        <input
          placeholder="0999999999"
          aria-label="Phone Number"
          type="text"
          name="phoneNumber"
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