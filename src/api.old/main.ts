import { fetchData } from "shared/fetch";

const fetchMain = fetchData("main");

interface IApiMain {
  index: () => any;
  getGraphicData: () => any;
  isServerConnected: () => any;
}

const main: IApiMain = {
  index: async () => await fetchMain({ index: {} }),
  getGraphicData: async () => await fetchMain({ getGraphicData: {} }),
  isServerConnected: async () => await fetchMain({ isServerConnected: {} }),
};

export { main };
