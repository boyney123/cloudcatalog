import * as path from "path";
const PROJECT_DIR = process.env.PROJECT_DIR || "";
const SERVICES_DIR = path.join(PROJECT_DIR, "/data/services");
import fg from "fast-glob";
import { Service, User } from "@/types";
import { readMarkdownFile } from "./file-reader";
import { getAllUsers } from "./users";

export const getAllServices = async (): Promise<Service[]> => {
  // Find all service files
  const services = await fg([`${SERVICES_DIR}/**/index.md`]);
  const readAllFiles = services.map((file) =>
    readMarkdownFile(path.join(file)),
  );
  const files = await Promise.all(readAllFiles);
  // @ts-ignore
  return files.map(
    (file) => ({ ...file.frontmatter, source: file }) as Service,
  );
};

export const getServiceByName = async (
  name: string,
): Promise<Service | undefined> => {
  const allServices = await getAllServices();
  const service = allServices.find((service) => service.id === name);
  return service;
};

export const getAllServicesByUserId = async (
  userId: string,
): Promise<Service[]> => {
  const allServices = await getAllServices();
  return allServices.filter((service) => {
    const serviceOwners = service.owners;
    if (serviceOwners) {
      return serviceOwners.includes(userId);
    }
  });
};

export const getUsersByService = async (service: Service): Promise<User[]> => {
  const allUsers = await getAllUsers();
  const usersInService = service.owners;

  const users = allUsers.filter((user) => {
    return usersInService?.includes(user.id);
  });

  return users;
};
