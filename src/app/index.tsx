import { withProviders } from "./providers";
import { Layout } from "./layouts";

import { Routing } from "pages";

import "shared/lib/i18n";

import "./index.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  return (
    <Layout>
      <Routing />
    </Layout>
  );
};

export default withProviders(App);
