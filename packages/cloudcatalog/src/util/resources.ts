import * as path from "path";
const PROJECT_DIR = process.env.PROJECT_DIR || "";
const RESOURCES_DIR = path.join(PROJECT_DIR, "/data/resources");
import fg from "fast-glob";
import {
  LambdaResource,
  Resource,
  Service,
  StepFunctionResource,
  User,
} from "@/types";
import { readMarkdownFile } from "./file-reader";
import { getAllUsers } from "./users";
import serviceMap from "../service-map.json";

type ServiceResource = LambdaResource | StepFunctionResource;

export const getResources = async (
  service: string,
): Promise<ServiceResource[]> => {
  const resources = await fg([`${RESOURCES_DIR}/${service}/**.md`]);
  const readAllFiles = resources.map((file) =>
    readMarkdownFile(path.join(file)),
  );
  const files = await Promise.all(readAllFiles);
  //@ts-ignore
  return files.map((file) => file.frontmatter as ServiceResource);
};

export const getAllResources = async () => {
  const lambdaResources = await getResources("lambda");
  const stepFunctionsResources = await getResources("step-function");
  const sqsResources = await getResources("sqs");
  return [...lambdaResources, ...stepFunctionsResources, ...sqsResources];
};

export const getAllResourcesForService = async (serviceId: string) => {
  const allResources = await getAllResources();
  return allResources.filter((resource) => resource.service === serviceId);
};

export const getResourceByResourceTypeAndName = async (
  type: string,
  name: string,
) => {
  return readMarkdownFile(path.join(RESOURCES_DIR, type, `${name}.md`));
};

export const groupResourcesByService = async (resources: Resource[]) => {
  return resources.reduce((acc: any, resource) => {
    const service = resource.service;
    if (service) {
      let resourcesInService = [];
      if (acc[service]) {
        resourcesInService = acc[service];
      }
      resourcesInService.push(resource);
      return {
        ...acc,
        [service]: resourcesInService,
      };
    }
    return acc;
  }, {});
};

export const groupResourcesByAWSServiceName = (
  resources: Resource[],
): Promise<Record<string, Resource>> => {
  return resources.reduce((acc: any, resource) => {
    const service = serviceMap[resource.AWS.Service];
    acc[service] = acc[service] || [];
    acc[service].push(resource);
    return acc;
  }, {});
};

export const getAllResourcesForUser = async (
  userId: string,
): Promise<Resource[]> => {
  const allResources = await getAllResources();
  return allResources.filter((resource) => {
    const resourceOwners = resource.owners;
    if (resourceOwners) {
      return resourceOwners.includes(userId);
    }
  });
};

export const getUsersByResource = async (
  resource: Resource,
): Promise<User[]> => {
  const allUsers = await getAllUsers();
  const usersInResource = resource.owners;

  const users = allUsers.filter((user) => {
    return usersInResource?.includes(user.id);
  });

  return users;
};
