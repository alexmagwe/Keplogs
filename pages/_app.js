import Toolbar from "../components/Toolbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toolbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
