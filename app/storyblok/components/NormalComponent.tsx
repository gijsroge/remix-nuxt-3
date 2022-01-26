import { useLoaderData, Form } from "remix";

export async function loader(context: any) {
  const index = context.index;
  const response = await fetch(`https://dummyjson.com/products/${index}`);
  return await response.json();
}

export async function action(context: any) {
  return null;
}

export function component({ block }) {
  const { data } = useLoaderData<any>();
  return (
    <div>
      <h1>{block.title}</h1>

      <h2>Formdata:</h2>

      <Form method="post" action="/">
        <input type="text" name="title" />
        <input type="text" name="description" />
        <button>Submit</button>
      </Form>
    </div>
  );
}
