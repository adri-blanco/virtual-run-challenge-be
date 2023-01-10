/* eslint-disable @typescript-eslint/no-explicit-any */
import runner from "./runner-controller";

export type ControllersType = "runner";
export type ControllerOperationsType = {
  get?: (data: any) => Promise<object>;
  create?: (data: any) => Promise<object>;
  list?: (data: any) => Promise<object>;
  update?: (data: any) => Promise<object>;
  delete?: (data: any) => Promise<object>;
};

export default {
  runner,
};
