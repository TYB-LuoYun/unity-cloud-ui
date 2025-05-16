import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
type Result = {
  success: boolean;
  data: {
    routerVos: Array<any>,
    btnAuths: Array<any>
  };
};

export const getAsyncRoutes = () => {
  return http.request<Result>("get", baseUrlApi("/auth/menu-resource"));
};
