import { Router, Route, RootRoute } from "@tanstack/react-router";
import LoginPage from "./pages/Login.jsx";
import HomePage from "./pages/Home.jsx";
import ProfilePage from "./pages/Profile";
import SampleFinder from "./pages/SampleFinder.jsx";

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

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const sampleFinderRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/samplefinder",
  component: SampleFinder,
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
  homeRoute,
  sampleFinderRoute,
]);

export const router = new Router({ routeTree });

export default router;
