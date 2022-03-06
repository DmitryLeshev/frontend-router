import * as ui from "./ui";

export const GET_PARAMS = {
  popup: "popup",
  notificationId: "notification-id",
};

export const GET_ENUMS = {
  popup: {
    signIn: "sign-in",
    signUp: "sign-up",
    event: "event",
    notifications: "notifications",
    notificationDetails: "notification-details",
  },
};

export const popups = {
  [GET_ENUMS.popup.signIn]: ui.SignIn,
  [GET_ENUMS.popup.signUp]: ui.SignUp,
  [GET_ENUMS.popup.event]: ui.Event,
  [GET_ENUMS.popup.notifications]: ui.Notifications,
};
