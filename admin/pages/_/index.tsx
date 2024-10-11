import { getRootLayout } from "../layout";
Page.getLayout = getRootLayout;

export default function Page() {
  return <h1>Custom Page</h1>;
}
