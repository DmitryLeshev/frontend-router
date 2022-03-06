import { modelRouter, libRouter } from "entities/router";
import { RouterRange } from "shared/api";
import { Button } from "shared/ui/components";

export type ToggleRouterProps = {
  range: RouterRange;
  withStatus?: boolean;
  className?: string;
};

// resolve / unresolve
export const ToggleRouter = ({
  className,
  range,
  withStatus = true,
}: ToggleRouterProps) => {
  const router = modelRouter.selectors.useRouter(range);

  // console.log("ToggleRouter", range, router);
  if (!router) return null;

  const status = libRouter.getRouterStatus(router);

  return (
    <Button
      className={className}
      onClick={() => modelRouter.events.toggleRouter(router)}
    >
      {withStatus && status}
    </Button>
  );
};
