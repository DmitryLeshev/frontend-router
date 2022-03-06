import { fetchData } from "shared/fetch";

const fetchAuth = fetchData("auth");

export interface LoginDTO {
  login: string;
  password: string;
}

interface IApiAuth {
  login: ({ login, password }: LoginDTO) => any;
  create: ({ login, password }: LoginDTO) => any;
  logout: () => any;
  status: () => any;
}

const auth: IApiAuth = {
  login: async ({ login, password }) =>
    await fetchAuth({ login: { login, password } }),
  create: async ({ login, password }) =>
    await fetchAuth({ create: { login, password } }),
  logout: async () => await fetchAuth({ logout: {} }),
  status: async () => await fetchAuth({ status: {} }),
};

export { auth };
