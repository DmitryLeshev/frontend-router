import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";

import { useGetParameter, usePrepareLink } from "shared/hooks";
import { GET_PARAMS, popups } from "./config";

let timeout: NodeJS.Timeout;

export const useGetPopupState = () => {
  const popupName = useGetParameter(GET_PARAMS.popup);
  const [mountedPopup, setMountedPopup] = useState<any>(popupName);

  useEffect(() => {
    if (popupName) {
      timeout && clearTimeout(timeout);
      setMountedPopup(popupName);
    } else {
      timeout = setTimeout(() => {
        setMountedPopup(null);
      }, 300);
    }
  }, [popupName]);

  useEffect(() => {
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  const isOpened = useMemo(() => Boolean(popupName), [popupName]);

  return { mountedPopup, isOpened };
};

export const GetParameterPopups = () => {
  const { mountedPopup, isOpened } = useGetPopupState();
  const Component: any = popups[mountedPopup];

  if (!Component) {
    return null;
  }

  return <Component isOpened={isOpened} />;
};

export const useClosePopup = () => {
  const location = useLocation<{ hasPrevRoute: boolean }>();
  const history = useHistory();
  const match = useRouteMatch();

  console.log("useClosePopup", { location, history, match });

  return useCallback(() => {
    // if (state && state.hasPrevRoute) {
    if (false) {
      history.goBack();
    } else {
      history.replace(match.url);
    }
  }, [history, match.url]);
};

export const usePreparePopupLink = (linkData: any) => {
  return usePrepareLink({
    ...linkData,
    state: {
      hasPrevRoute: true,
    },
  });
};
