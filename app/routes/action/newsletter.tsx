import { ActionFunction, json } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const email = (await request.formData()).get("email");
  try {
    // subscribe logic
    return json({ ok: true });
  } catch (error) {
    return json({ error: error.message });
  }
};
