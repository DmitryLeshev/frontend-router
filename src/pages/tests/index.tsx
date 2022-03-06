import { useEffect } from "react";
import { Link, Route, RouteChildrenProps } from "react-router-dom";
import { reflect } from "@effector/reflect";

import { ToggleRouter } from "features/router-toggle";
import { RouterCard, modelRouter } from "entities/router";
import { RouterRange } from "shared/api";
import { useRouter } from "shared/hooks";
import { usePreparePopupLink } from "widgets/popups/lib";

type Props = RouteChildrenProps<{ range: RouterRange }> & {
  isLoading: boolean;
};

const View = ({ match, isLoading }: Props) => {
  const range = match?.params.range;

  const routers = modelRouter.selectors.useRouters();
  const router = modelRouter.selectors.useRouter(range);

  // console.log("View", { router, match, isLoading });

  useEffect(() => {
    modelRouter.effects.getRouterInfoFx();
  }, []);

  if (!routers && !isLoading) {
    return (
      <div>
        404 Routers not found
        <Link to="/tests">Back to tests</Link>
      </div>
    );
  }

  return (
    <div className="container">
      TEST
      {routers?.map((router, idx) => {
        return { idx };
        // <RouterCard
        //   key={idx}
        //   loading={isLoading}
        //   data={router}
        //   children={<ToggleRouter range={router.range} />}
        // />
      })}
      <nav>
        <Link to={`${match?.url}?popup=sign-up`}>sign-up</Link>
        <Link to={`${match?.url}?popup=sign-in`}>sign-in</Link>
        <Link to={`${match?.url}?popup=notifications`}>notifications</Link>
        <Link to={`${match?.url}/likes`}>Likes</Link>
      </nav>
      <Route
        path={`${match?.url}/likes`}
        children={({ match }) => {
          console.log({ match });
          if (Boolean(match)) return "Likes";
          return null;
        }}
      />
    </div>
  );
};

const TestPage = reflect({
  view: View,
  bind: {
    isLoading: modelRouter.$routersLoading,
  },
});

export default TestPage;
