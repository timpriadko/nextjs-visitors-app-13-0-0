import "../styles/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
