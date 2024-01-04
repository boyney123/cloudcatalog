import { Resource, Service, Team, User } from "@/types";

import * as path from "path";
const PROJECT_DIR = process.env.PROJECT_DIR || "";
const SERVICES_DIR = path.join(PROJECT_DIR, "/data/teams");
import fg from "fast-glob";
import { readMarkdownFile } from "./file-reader";
import { getAllUsers } from "./users";
import { getAllServices } from "./services";
import { getAllResources } from "./resources";

export const getAllTeams = async (): Promise<Team[]> => {
  // Find all service files
  const teams = await fg([`${SERVICES_DIR}/**/index.md`]);
  const readAllFiles = teams.map((file) => readMarkdownFile(path.join(file)));
  const files = await Promise.all(readAllFiles);
  // @ts-ignore
  return files.map((file) => ({ ...file.frontmatter, source: file }) as Team);
};

export const getTeamById = async (
  teamId: string,
): Promise<Team | undefined> => {
  const allTeams = await getAllTeams();
  return allTeams.find((team) => team.id === teamId);
};

export const getTeamsByUser = async (
  user: User,
): Promise<Team[] | undefined> => {
  const userTeams = user.teams;
  const allTeams = await getAllTeams();
  return allTeams.filter((team) => userTeams?.includes(team.id));
};

export const getUsersInTeam = async (
  team: Team,
): Promise<User[] | undefined> => {
  const allUsers = await getAllUsers();
  const teamId = team.id;
  return allUsers.filter((user) => user.teams?.includes(teamId));
};
export const getTeamsByResource = async (
  resource: Resource,
): Promise<Team[] | undefined> => {
  const allTeams = await getAllTeams();
  const owners = resource.owners;
  return allTeams.filter((team) => owners?.includes(team.id));
};
export const getTeamsByService = async (
  service: Service,
): Promise<Team[] | undefined> => {
  const allTeams = await getAllTeams();
  const owners = service.owners;
  return allTeams.filter((team) => owners?.includes(team.id));
};

export const getServicesByTeam = async (
  team: Team,
): Promise<Service[] | undefined> => {
  const allServices = await getAllServices();

  const services = allServices.filter((service) => {
    return service.owners?.includes(team.id);
  });

  return services;
};
export const getResourcesOwnedByTeam = async (
  team: Team,
): Promise<Resource[] | undefined> => {
  const allResources = await getAllResources();

  const resources = allResources.filter((resource) => {
    return resource.owners?.includes(team.id);
  });

  return resources;
};
