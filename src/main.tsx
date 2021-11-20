import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import FirebaseProvider from "./FirebaseProvider"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
