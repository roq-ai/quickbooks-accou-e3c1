import queryString from 'query-string';
import { TeamInterface, TeamGetQueryInterface } from 'interfaces/team';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTeams = async (query?: TeamGetQueryInterface): Promise<PaginatedInterface<TeamInterface>> => {
  return fetcher('/api/teams', {}, query);
};

export const createTeam = async (team: TeamInterface) => {
  return fetcher('/api/teams', { method: 'POST', body: JSON.stringify(team) });
};

export const updateTeamById = async (id: string, team: TeamInterface) => {
  return fetcher(`/api/teams/${id}`, { method: 'PUT', body: JSON.stringify(team) });
};

export const getTeamById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/teams/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteTeamById = async (id: string) => {
  return fetcher(`/api/teams/${id}`, { method: 'DELETE' });
};
