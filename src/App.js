import { routes } from './Router/router';
import './assets/styles/App.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      routes.map((item, i) => (
        <Route exact {...item} key={i} />
      ))
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
