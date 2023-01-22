import StravaAxios from "./StravaAxios";
import utils from "../utils/axios-utils";
import appError from "../utils/AppError";
import { Activity, AuthTokenResponse } from "../types/Strava.types";
import { fromMeterPerSecondToKmHour } from "../utils/converter";

function loginWithCode(code: string) {
  const params = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
  };

  return StravaAxios.post<any, AuthTokenResponse>(`/oauth/token?${utils.getParams(params)}`)
    .then((info) => {
      return {
        accessToken: info.access_token,
        refreshToken: info.refresh_token,
        id: info.athlete.id,
        firstname: info.athlete.firstname,
        lastname: info.athlete.lastname,
        profile: info.athlete.profile,
        profileMedium: info.athlete.profile_medium,
      };
    })
    .catch((err) => {
      if (err.errors[0].field === "code" && err.errors[0].code === "invalid") {
        throw appError("Code is invalid", err.status, err.errors);
      }
      throw appError("Unhandled Error", 500, err);
    });
}

function getActivities() {
  return StravaAxios.get<any, Activity[]>("/athlete/activities").then((activities) =>
    activities.map((act) => ({
      id: act.id,
      athlete: act.athlete.id,
      name: act.name,
      distance: act.distance / 1000,
      movingTime: act.moving_time,
      elapsedTime: act.elapsed_time,
      elevationGain: act.total_elevation_gain,
      sportType: act.sport_type,
      startDate: act.start_date,
      startDateUnix: new Date(act.start_date).getTime(),
      avgSpeed: fromMeterPerSecondToKmHour(act.average_speed),
      maxSpeed: fromMeterPerSecondToKmHour(act.max_speed),
      avgCadence: Math.ceil(act.average_cadence * 2),
      wasRace: act.workout_type === 1,
    })),
  );
}

export default {
  getActivities,
  loginWithCode,
};
