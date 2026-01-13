import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
import './App.css'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Feed from './Components/Feed'
import appStore from './utils/appStore';
import EditProfile from './Components/EditProfile';
import Connections from './Components/Connections';
import Requests from './Components/Requests';

function App() {

  const routerDetails = createBrowserRouter([
    {
      path: '/',
      element: <Body />,
      children: [
        {
          path: '/',
          element: <Feed />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/edit-profile',
          element : <EditProfile />
        },
        {
          path: '/feed',
          element: <Feed />
        },
        {
          path: '/connections',
          element: <Connections />
        },
        {
          path: '/requests',
          element: <Requests />
        }
      ]
    }
  ])

  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={routerDetails} />
      </Provider>
    </>
  )
}

export default App
