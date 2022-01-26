import { Form, useActionData, useLoaderData } from "remix";

export async function loader(context: any) {
  const index = context.index;
  const response = await fetch(`https://dummyjson.com/products/${index}`);
  return await response.json();
}

export async function action(context: any) {
  return context;
}

export function component({ block }) {
  const { data } = useLoaderData<any>();
  const actionData = useActionData();

  console.log(actionData);
  return (
    <div>
      <h1>{block.title}</h1>
      <Form method="post" action="?">
        <input type="hidden" value={block.component} name="component" />
        <input type="text" name="title" />
        <input type="text" name="description" />
        <button>Submit</button>
      </Form>
    </div>
  );
}
