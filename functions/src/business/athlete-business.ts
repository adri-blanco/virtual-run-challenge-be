import firebaseServices from "../services/firebase-services";
import StravaServices from "../services/strava-services";
import { setToken } from "../services/StravaAxios";
import appError from "../utils/AppError";

async function create(code: string) {
  const athleteInfo = await StravaServices.loginWithCode(code);
  setToken(athleteInfo.accessToken);

  const alreadyExists = await firebaseServices.get("Athlete", athleteInfo.id);
  if (alreadyExists.exists) {
    throw appError(`User with id "${athleteInfo.id}" already exists`, 400);
  }

  const activities = await StravaServices.getActivities();

  const createPromise = firebaseServices.create("Athlete", athleteInfo);
  const createAllPromise = firebaseServices.createAll("Activity", activities);
  await Promise.all([createPromise, createAllPromise]);

  return {
    ...athleteInfo,
    activities: activities.length,
  };
}

const AthleteBusiness = {
  create,
};

export default AthleteBusiness;
