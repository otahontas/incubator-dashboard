import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { FirebaseAppProvider } from "reactfire"
import { firebaseConfig } from "./firebaseConfig"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseAppProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
