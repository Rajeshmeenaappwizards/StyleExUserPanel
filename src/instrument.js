import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { 
  createRoutesFromChildren, 
  matchRoutes, 
  useLocation, 
  useNavigationType 
} from "react-router-dom";

Sentry.init({
  dsn:process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    /^\//, 
    /^https:\/\/hammerhead-app-aegxp\.ondigitalocean\.app\/api/
  ],  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
