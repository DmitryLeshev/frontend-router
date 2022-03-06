import { Suspense } from "react";
import { Router } from "react-router-dom";
import { router } from "shared/lib";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <Router history={router.history}>
      <Suspense fallback={"Loading..."}>{component()}</Suspense>
    </Router>
  );
