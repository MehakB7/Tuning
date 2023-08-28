import { END_POINTS } from "./domain";
import { BaseApi } from "./api";

export const whoAmi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWhoAmI: builder.query({
      query: () => ({
        url: `${END_POINTS.whoami}`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }),
      transformResponse: (res, meta, args) => {
        return res;
      },
    }),
  }),
});

export const { useGetWhoAmIQuery } = whoAmi;
export const userInfo = whoAmi.endpoints.getWhoAmI.select();
