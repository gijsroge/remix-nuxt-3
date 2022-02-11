import loadable from "@loadable/component";

const OtherComponent = loadable(() => import("./../components/Test"));

export default function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
