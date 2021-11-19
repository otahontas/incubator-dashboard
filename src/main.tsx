import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import FirebaseProvider from "./FirebaseProvider"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
        <FirebaseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FirebaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
