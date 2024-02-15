import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persister } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import InternetConnectionProvider from "./components/providers/InternetConnectionProvider.tsx";
import { theme } from "./theme";

// const theme = extendTheme({
//   config: {
//     initialColorMode: "dark",
//     useSystemColorMode: false,
//   },
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <InternetConnectionProvider>
      <PersistGate loading={null} persistor={persister}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </InternetConnectionProvider>
  </Provider>
);
