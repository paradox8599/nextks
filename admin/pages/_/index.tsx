import { getRootLayout } from "../../layout-page";
Page.getLayout = getRootLayout;

export default function Page() {
  return <h1>Custom Page</h1>;
}
