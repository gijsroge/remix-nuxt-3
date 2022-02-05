import { Form, useActionData, useLoaderData } from "remix";
import { actionTarget } from "~/utils/forms";

export async function loader(context: any) {
  const index = context.index;
  const response = await fetch(`https://dummyjson.com/products/${index}`);
  return await response.json();
}

export async function action(context: any) {
  return new Promise((resolve) => setTimeout(() => resolve(context), 3000));
}

export function component({ content }: { content: any }) {
  const { data } = useLoaderData<any>();
  const actionData = useActionData();

  return (
      <div>
        <h1>{content.title}</h1>
        <Form
          replace
          method="post"
          className="space-y-2"
          action={actionTarget()}
        >
          <input type="hidden" value={content._uid} name="uid" />
          <input type="hidden" value={content.component} name="component" />
          <input type="text" name="title" />
          <input type="text" name="description" />
          <button>submit</button>
        </Form>
      </div>
  );
}
