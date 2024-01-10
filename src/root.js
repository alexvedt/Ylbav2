import { Router, Route, RootRoute } from "@tanstack/react-router";
import LoginPage from "./pages/Login.jsx";
import HomePage from "./pages/Home.jsx";
import ProfilePage from "./pages/Profile";

import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

// NOTE: @see https://tanstack.com/router/v1/docs/guide/routes

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// const profileRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/profiles/$profileId",
//   component: ProfilesPage,
// });

const myProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  myProfileRoute,
]);

export const router = new Router({ routeTree });

export default router;
