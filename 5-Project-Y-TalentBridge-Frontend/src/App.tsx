import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { store } from "@/features/store";
import { setupAxiosInterceptors } from "./lib/axiosClient";
import { Toaster } from "sonner";

const App = () => {
  setupAxiosInterceptors(store.dispatch);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </Provider>
  );
};

export default App;
