import { 
  Outlet, 
  useLoaderData, 
  Form, 
  redirect, 
  NavLink,
  useNavigation,
  useSubmit,
  useSearchParams } from "react-router-dom";
import { getContacts } from "../contact";

export async function loader({ request }) {
  const url = new URL(request.url);
  let s = url.searchParams.get("s");
  if(!s) {
    s = ''
  }
  let t = url.searchParams.get("t");
  if(!t) {
    t = ''
  }
  const {contacts, next, prev } = await getContacts(s,t);
    return { contacts, s, next, prev};
}
import { useEffect } from "react";
  
export async function action() {
    return redirect(`/newContact/`);
}


export default function Root() {
    const { contacts, s, next, prev } = useLoaderData();
    // eslint-disable-next-line no-unused-vars
    const [ searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigation();
    const submit = useSubmit();

    const nextPage = () => {
      redirect('/');
      console.log(next);
      setSearchParams((params) => ({
        ...params,
        t: next
      }))
    };

    const prevPage = () => {
      console.log(prev);
      setSearchParams((params) => ({
        ...params,
        t: ''
      }))
    };

    const searching =
    navigation.location &&
    (new URLSearchParams(navigation.location.search).has(
      "s"
    ));

    useEffect(() => {
      document.getElementById("s").value = s;
    }, [s]);

    return (
      <>
        <div id="sidebar">
          <div>
            <button
              onClick={() => prevPage()}
            >Reset</button>
            <button
              disabled={!next}
              onClick={() => nextPage()}
            >Next</button>
          </div>
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