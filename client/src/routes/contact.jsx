/* eslint-disable react/prop-types */
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contact";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={contact.id}
          src="https://i.natgeofe.com/k/09db0b0a-9ca5-47de-93a8-00bbb9a3a50d/ADULTS_CHINSTRAP_PENGUIN-PROFILES_KIDS_0123_square.jpg"
        />
      </div>

      <div>
        <h1>
          {contact.name ? (
            <>
              {contact.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          
        </h1>

        {contact.email && (
          <p>
              {contact.email}
          </p>
        )}

        {contact.phoneNumber && <p>{contact.phoneNumber}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="delete"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
