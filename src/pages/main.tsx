import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AddForecast from "../containers/AddForecast";
import Forecasts from "../containers/Forecasts";
import "../styles/global.css";

const router = createBrowserRouter([
  {
    path: "/forecasts",
    element: <Forecasts />,
  },
  {
    path: "/add-forecast",
    element: <AddForecast />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
)
