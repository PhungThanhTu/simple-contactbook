import { 
  Outlet, 
  useLoaderData, 
  Form, 
  redirect, 
  NavLink,
  useNavigation,
  useSubmit } from "react-router-dom";
import { getContacts } from "../contact";

export async function loader({ request }) {
  const url = new URL(request.url);
  let s = url.searchParams.get("s");
  if(!s) {
    s = ''
  }
  const contacts = await getContacts(s);
    return { contacts, s };
}
import { useEffect } from "react";
  
export async function action() {
    return redirect(`/newContact/`);
}

export default function Root() {
    const { contacts, s } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    useEffect(() => {
      document.getElementById("s").value = s;
    }, [s]);

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="s"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="s"
                defaultValue={s}
                onChange={(event) => {
                  const isFirstSearch = s == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
                <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.name ? (
                      <>
                        {contact.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div 
          id="detail"
          className={
            navigation.state === "loading" ? "loading" : ""
          }>
            <Outlet/>
        </div>
      </>
    );
  }