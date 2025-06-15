import Navbar from "../components/Navbar";


import "../styles/styles.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
