import instance from "../api/instance";
import { EpisodeResponse } from "../types/apitypes";

export const GetEpisodes = async (): Promise<EpisodeResponse> => {
  const response = await instance.get(`episode`);

  return response.data;
};
