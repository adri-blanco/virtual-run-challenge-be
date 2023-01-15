import { ControllerOperationsType } from ".";
import AthleteBusiness from "../business/athlete-business";
import { CreateData, GetData } from "./athlete-controller.types";
import appError from "../utils/AppError";

async function create({ code }: CreateData) {
  if (!code) {
    throw appError("code is mandatory", 400);
  }
  return await AthleteBusiness.create(code);
}

async function get({ id }: GetData) {
  return {
    status: "ok",
    athleteId: id,
  };
}

const AthleteController: ControllerOperationsType = {
  create,
  get,
};

export default AthleteController;
