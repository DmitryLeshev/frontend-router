// import { Route } from "react-router-dom";
// import { Dialog } from "@material-ui/core";
// import { useRouter } from "shared/hooks";

// interface Props {}

// const Popup = (props: Props) => {
//   const { history, match } = useRouter();
//   return (
//     <Route
//       path={`${match.url}/sign-up`}
//       children={({ match }) => {
//         return (
//           <Dialog onClose={history.goBack} open={Boolean(match)}>
//             <div>sign-up</div>
//           </Dialog>
//         );
//       }}
//     />
//   );
// };

export * from "./ui";
export * as popupsLib from "./lib";
