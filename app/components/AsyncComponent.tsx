import { Form, useLoaderData } from "remix";

export async function AsyncComponentLoader(component: any) {
  const index = component.index;
  const response = await fetch(`https://dummyjson.com/products/${index}`);
  return await response.json();
}

export function AsyncComponent({ block }) {
  const { data } = useLoaderData<any>();
  return (
    <div>
      <h1>{JSON.stringify(data[block._uid])}</h1>
      <Form method="post" action="/one">
        <button>submit</button>
      </Form>
    </div>
  );
}
