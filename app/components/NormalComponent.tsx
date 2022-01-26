import { useLoaderData, Form } from "remix";

export function NormalComponent({ block }) {
  const { data } = useLoaderData<any>();
  return (
    <Form method="post" action="">
      <input type="text" name="title" />
      <input type="text" name="description" />
      <button>Submit</button>
    </Form>
  );
}
