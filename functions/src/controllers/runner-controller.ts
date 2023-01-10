import { ControllerOperationsType } from ".";
import appError from "../utils/AppError";

interface GetData {
  id: string;
}
async function get({ id }: GetData) {
  return {
    status: "ok",
    runnerId: id,
  };
}

async function list() {
  if (Math.random() < 0.5) {
    throw appError("Operation not supported yet", 400);
  }
  return [];
}

const RunnerController: ControllerOperationsType = {
  get,
  list,
};

export default RunnerController;
