import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persister } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
