/* eslint-disable @typescript-eslint/no-explicit-any */
import athlete from "./athlete-controller";

export type ControllersType = "athlete";
export type ControllerOperationsType = {
  get?: (data: any) => Promise<object>;
  create?: (data: any) => Promise<object>;
  list?: (data: any) => Promise<object>;
  update?: (data: any) => Promise<object>;
  delete?: (data: any) => Promise<object>;
};

export default {
  athlete,
};
