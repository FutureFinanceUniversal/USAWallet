import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./components/Support/reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const appId = "CkGKKjw1WWWWNAo2GRMO1yPyjTrRx8YAIX4E8Q8q";
const serverUrl = "https://jlodflimpqon.moralis.io:2053/server";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
