import instance from "../api/instance";
import { Episode, SeasonResponse } from "../types/apitypes";

export const GetSeason = async (id: string): Promise<SeasonResponse> => {
  const response = await instance.get(`episode/?episode=s0${id}`);

  return response.data;
};

export const GetEpisode = async (id: string): Promise<Episode> => {
  const response = await instance.get(`episode/${id}`);

  return response.data;
};
