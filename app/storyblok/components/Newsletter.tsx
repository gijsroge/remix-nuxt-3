import { useFetcher } from "remix";

export function component({ content }: { content: any }) {
  const newsletter = useFetcher();
  const newsletterData: any | null =
    newsletter.type === "done" ? newsletter.data : null;

  const success = newsletter.type === "done" && newsletterData?.ok;

  console.log(newsletterData);
  return (
    <div>
      <newsletter.Form noValidate method="post" action="/action/newsletter">
        <input type="email" name="email" placeholder="email" />
        <button>submit</button>

        {success ? <p>Ingeschreven!</p> : ""}
      </newsletter.Form>
    </div>
  );
}
