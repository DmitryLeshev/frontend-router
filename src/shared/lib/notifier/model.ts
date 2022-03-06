const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";

const enqueueSnackbar = (notification: any) => {
  const key = notification.options && notification.options.key;
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

const closeSnackbar = (key: any) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

const removeSnackbar = (key: any) => ({
  type: REMOVE_SNACKBAR,
  key,
});

const defaultState: any = [];

export const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return [
        ...state,
        {
          key: action.key,
          ...action.notification,
        },
      ];

    case CLOSE_SNACKBAR:
      return [
        ...state.map((notification: any) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      ];

    case REMOVE_SNACKBAR:
      return [
        ...state.filter((notification: any) => notification.key !== action.key),
      ];

    default:
      return state;
  }
};

const useNotifications = (store: any) => store.notifications || [];

export const actions = {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
};

export const selectors = {
  useNotifications,
};
