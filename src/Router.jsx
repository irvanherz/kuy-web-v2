import Checkout from "pages/checkout"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout"
import Auth from "./pages/auth"
import Chats from "./pages/chats"
import CreateOrganizer from "./pages/create-organizer"
import CreateTrip from "./pages/create-trip"
import EditTrip from "./pages/edit-trip"
import HomePage from "./pages/home"
import MyOrganizers from "./pages/my-organizers"
import NotFound from "./pages/not-found"
import OrganizerTrips from "./pages/organizer-trips"
import Register from "./pages/register"
import SetupAccount from "./pages/setup-account"
import TripDetails from "./pages/trip-details"
import UserDetails from "./pages/user-details"

const routes = [
  {
    path: '/',
    component: <HomePage />,
    layout: 'default',
  },
  {
    path: '/trips/:tripId',
    component: <TripDetails />,
    layout: 'default',
  },
  {
    path: '/organizers/:organizerId/trips',
    component: <OrganizerTrips />,
    layout: 'default',
  },
  {
    path: '/organizers/:organizerId/trips/create',
    component: <CreateTrip />,
    layout: 'default',
  },
  {
    path: '/organizers/:organizerId/trips/:tripId/edit',
    component: <EditTrip />,
    layout: 'default',
  },
  {
    path: '/organizers/create',
    component: <CreateOrganizer />,
    layout: 'default',
  },
  {
    path: '/organizers/mine',
    component: <MyOrganizers />,
    layout: 'default',
  },
  {
    path: '/chats',
    component: <Chats />,
    layout: 'default',
  },
  {
    path: '/auth/:authType',
    component: <Auth />,
    layout: 'blank',
  },
  {
    path: '/users/:userId',
    component: <UserDetails />,
    layout: 'default',
  },
  {
    path: '/users/me/setup',
    component: <SetupAccount />,
    layout: 'blank',
  },
  {
    path: '/checkout/:orderId',
    component: <Checkout />,
    layout: 'default',
  },
  {
    path: '*',
    component: <NotFound />,
    layout: 'default',
  },
]

const LAYOUTS = {
  default: Layout.Default,
  blank: Layout.Blank
}

const Router = () => {
  return (
    <Routes>
      {routes.map(route => {
        const LayoutComponent = LAYOUTS[route.layout];
        return (
          <Route
            path={route.path}
            key={route.path}
            element={
              <LayoutComponent>
                {route.component}
              </LayoutComponent>
            }
          />
        )
      })}
    </Routes>
  )
}

export default Router