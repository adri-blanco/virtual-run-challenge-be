import { ControllerOperationsType } from ".";
import ActivityBusiness from "../business/activity-business";
import { ListData } from "./activity-controller.types";

async function list({ since }: ListData) {
  return await ActivityBusiness.list(Number(since));
}

const ActivityController: ControllerOperationsType = {
  list,
};

export default ActivityController;
