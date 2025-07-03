import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { store } from "@/features/store";
import { setupAxiosInterceptors } from "./lib/axiosClient";
import { Toaster } from "sonner";
import { Worker } from "@react-pdf-viewer/core";
import * as pdfjs from "pdfjs-dist";

const App = () => {
  setupAxiosInterceptors(store.dispatch);

  return (
    <Provider store={store}>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
      >
        <RouterProvider router={router} />
        <Toaster richColors />
      </Worker>
    </Provider>
  );
};

export default App;
