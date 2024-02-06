import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import About from '../pages/About'
import MLB from '../pages/MLB'
import NFL from '../pages/NFL'
import NBA from '../pages/NBA'

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
      path: "",
      component: Home,
      name: "Home Screen",
    },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "Dashboard",
    },
    {
      path: "/about",
      component: About,
      name: "About",
    },
    {
        path: "/MLB",
        component: MLB,
        name: "MLB",
      },
      {
        path: "/NFL",
        component: NFL,
        name: "NFL"
      },
      {
        path: "NBA",
        component: NBA,
        name: "NBA"
      }
];

export default routes