import Header from "components/header";
import Alert from "../components/alert";
import Footer from "../components/footer";
import Meta from "../components/meta";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
