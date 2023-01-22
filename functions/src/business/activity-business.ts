import firebaseServices from "../services/firebase-services";
import { Where } from "../types/Firebase.types";
import { Activity } from "../types/Strava.types";

async function list(since?: number) {
  const whereConditions: Where[] = [];
  if (since) {
    whereConditions.push({
      field: "startDateUnix",
      op: ">",
      value: Number(since),
    });
  }
  const activities = (await firebaseServices.getAll("Activity", whereConditions, "startDateUnix")) as Activity[];

  let distance = 0;
  activities.forEach((activity) => {
    distance += activity.distance;
  });

  return {
    distance,
    since: since ? new Date(since) : null,
    length: activities.length,
    activities,
  };
}

const ActivityBusiness = {
  list,
};

export default ActivityBusiness;
