import { ImageWithFallback } from "@/components/ImageWithFallBack";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import { LambdaResource, Resource, Service, Team, User } from "@/types";
import { getConsoleURL } from "@/util/arn-to-console-url";
import { getResourceName } from "@/util/catalog-data-frontend";
import { formatBytes, formatSecondsToFriendlyString } from "@/util/formatters";
import {
  getAllResources,
  getResourceByResourceTypeAndName,
  getUsersByResource,
} from "@/util/resources";
import { getServiceByName } from "@/util/services";
import { getTeamsByResource } from "@/util/teams";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import React from "react";

interface Props {
  source: MDXRemoteSerializeResult;
  frontmatter: Resource;
  users?: User[];
  teams?: Team[];
  services?: Service[];
}

const components = (resource: Resource) => {
  return {
    code: ({ className, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter language={match[1]} {...props} />
      ) : (
        <code className={className} {...props} />
      );
    },
    CLICommand: (props: any) => {
      let text = "";

      // Refactor when we get more resources....

      text = props.children.replace("/Arn/", resource.AWS.Arn);

      if (resource.AWS.Service === "lambda") {
        text = text.replace("/FunctionName/", resource.AWS.FunctionName);
      }

      if (resource.AWS.Service === "step-function" && resource.AWS.Name) {
        text = text.replace("/StateMachineName/", resource.AWS.Name);
      }

      if (
        resource.AWS.Service === "sqs" &&
        resource.AWS.Name &&
        resource.AWS.QueueUrl
      ) {
        text = text.replace("/QueueUrl/", resource.AWS.QueueUrl);
      }

      return (
        <SyntaxHighlighter language="sh" {...props}>
          {text}
        </SyntaxHighlighter>
      );
    },
  };
};

const getImagesForRuntime = (runtime: string) => {
  let runtimeImage = "";

  if (runtime.includes("nodejs")) {
    runtimeImage = "nodejs";
  }

  return (
    <div className="flex flex-col">
      {runtimeImage && (
        <img className="w-24 h-8" src={`/runtimes/${runtimeImage}.svg`} />
      )}
      <span>{runtime}</span>
    </div>
  );
};
const buildOverviewForResource = (
  resource: Resource,
): { name: string; stat: any; icon?: any; colSpan?: number }[] | null => {
  switch (resource.AWS.Service) {
    case "lambda":
      return [
        { name: "CodeSize", stat: formatBytes(resource.AWS.CodeSize) },
        { name: "MemorySize", stat: resource.AWS.MemorySize },
        { name: "Runtime", stat: getImagesForRuntime(resource.AWS.Runtime) },
        { name: "Handler", stat: resource.AWS.Handler },
        { name: "Last Modified", stat: resource.AWS.LastModified },
      ];
    case "step-function":
      return [
        {
          name: "Logging Configuration",
          stat: resource.AWS.LoggingConfiguration,
        },
        { name: "Status", stat: resource.AWS.Status },
        { name: "Type", stat: resource.AWS.Type },
        { name: "Creation Date", stat: resource.AWS.CreationDate },
      ];
    case "dynamodb":
      return [
        {
          name: "Table Status",
          stat: resource.AWS.TableStatus,
        },
        {
          name: "Table Size",
          stat: resource.AWS.TableSizeBytes
            ? formatBytes(resource.AWS.TableSizeBytes)
            : "",
        },
        {
          name: "Deletion Protection",
          stat: resource.AWS.DeletionProtectionEnabled ? "On" : "Off",
        },
        {
          name: "Stream enabled",
          stat: resource.AWS.StreamSpecification?.StreamEnabled ? "On" : "Off",
        },
        {
          name: "Read Capacity Units",
          stat: resource.AWS.ProvisionedThroughput?.ReadCapacityUnits,
        },
        {
          name: "Write Capacity Units",
          stat: resource.AWS.ProvisionedThroughput?.WriteCapacityUnits,
        },
        {
          name: "Creation Date",
          stat: resource.AWS.CreationDateTime,
          colSpan: 2,
        },
      ];
    case "sqs":
      return [
        {
          name: "Maximum Message Size",
          stat: resource.AWS.MaximumMessageSize
            ? formatBytes(resource.AWS.MaximumMessageSize)
            : "",
        },
        {
          name: "Message Retention Period",
          stat: resource.AWS.MessageRetentionPeriod
            ? formatSecondsToFriendlyString(resource.AWS.MessageRetentionPeriod)
            : "Unknown",
        },
        {
          name: "Default visibility timeout",
          stat: resource.AWS.VisibilityTimeout
            ? `${resource.AWS.VisibilityTimeout / 60} minutes`
            : "",
        },
        {
          name: "Delivery Delay",
          stat: `${resource.AWS.DelaySeconds} Seconds`,
        },
        {
          name: "Receive message wait time",
          stat: `${resource.AWS.ReceiveMessageWaitTimeSeconds} Seconds`,
        },
        {
          name: "Encryption",
          icon: ShieldCheckIcon,
          stat:
            resource.AWS.SqsManagedSseEnabled === "true"
              ? "Amazon SQS key (SSE-SQS)"
              : "Disabled",
        },
        {
          name: "Created Date",
          stat: resource.AWS.CreatedTimestamp,
          colSpan: 2,
        },
        {
          name: "Queue URL",
          stat: (
            <SyntaxHighlighter className="text-xs" language={"bash"}>
              {resource.AWS.QueueUrl}
            </SyntaxHighlighter>
          ),
          colSpan: 2,
        },
      ];
    case "appsync":
      return [
        { name: "API Id", stat: resource.AWS.ApiId },
        { name: "API Type", stat: resource.AWS.ApiType },
        {
          name: "Endpoint",
          stat: (
            <SyntaxHighlighter className="text-xs" language={"bash"}>
              {resource.AWS.Endpoint}
            </SyntaxHighlighter>
          ),
        },
        { name: "Authentication Type", stat: resource.AWS?.AuthenticationType },
        { name: "Creation Date", stat: resource.AWS.CreationDate },
      ];

    default:
      return null;
  }
};

const ResourcePage = ({
  source,
  frontmatter: resource,
  users = [],
  teams = [],
  services = [],
}: Props) => {
  const overview = buildOverviewForResource(resource);
  const owners = [...users, ...teams];
  return (
    <div className="pb-20 resource-page ">
      <div
        className={`bg-gray-800 border-b-8 resource-header border-yellow-600 ${resource.AWS.Service}`}
      >
        <div className="mx-auto max-w-7xl py-16  sm:py-24  lg:flex justify-between ">
          <div className="w-full">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {getResourceName(resource)}
            </h2>
            <p className="mt-5 text-xl text-gray-400">{resource.description}</p>
          </div>
          <div className="w-full -mt-10 flex justify-end items-center">
            <ImageWithFallback
              service={resource.AWS.Service}
              className="w-40 shadow-md opacity-75 rounded-md "
              size="lg"
            />
            {/* <img className="w-40 shadow-md opacity-75 rounded-md " src={`/services/${resource.AWS.Service}.svg`} /> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto  -mt-10 ">
        <main className="border-r border-gray-200 pr-4 col-span-8 rounded-lg bg-white px-5 py-6 shadow-xl sm:px-6 ">
          <div className="prose prose-lg">
            <MDXRemote {...source} components={components(resource)} />
          </div>
        </main>

        <div className="col-span-4 space-y-2  ">
          {resource?.catalog?.generic && (
            <div className="rounded-lg bg-white  px-5 py-6 border border-gray-200 shadow sm:px-6">
              <h2
                className="text-base font-medium text-gray-900"
                id="recent-hires-title"
              >
                Overview
              </h2>

              <p className="text-xs text-gray-500 py-4">
                This resource has not been enriched with data from AWS.{" "}
                <a
                  className="text-blue-500 underline mt-2 block"
                  href="https://cloudcatalog.dev/docs/overview/guides/resources/AWS/All%20other%20resources/contributing"
                >
                  Contribute to CloudCatalog to get this resource supported
                  &rarr;
                </a>
              </p>
            </div>
          )}
          {overview && !resource?.catalog?.generic && (
            <div className="rounded-lg bg-white border border-gray-200 shadow  px-5 py-6 shadow sm:px-6">
              <div className="flex justify-between items-center">
                <h2
                  className="text-base font-medium text-gray-900"
                  id="recent-hires-title"
                >
                  Overview
                </h2>
              </div>
              <div className="mt-6 flow-root">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {overview.map((item) => {
                    const colSpanClass = item.colSpan
                      ? `col-span-${item.colSpan}`
                      : "";
                    return (
                      <div
                        key={item.name}
                        className={`overflow-hidden ${colSpanClass}`}
                      >
                        <dt className="truncate font-medium text-gray-500  text-xs flex items-center space-x-1">
                          <span>{item.name} </span>
                          {/* @ts-ignore */}
                          {item.icon && <item.icon className="w-4 block" />}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold tracking-tight text-gray-900">
                          {item.stat}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
              <div className="mt-6">
                <a
                  href={getConsoleURL(resource.AWS.Arn)}
                  target="_blank"
                  className={`flex w-full items-center justify-center rounded-md service-button border-2 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-orange-100 ${resource.AWS.Service}`}
                >
                  View in AWS Console &rarr;
                </a>
              </div>
              <span className="block text-xs text-gray-400 mt-4">
                Last update: {resource.catalog.updatedAt}
              </span>
            </div>
          )}

          {owners && owners.length > 0 && (
            <div className="rounded-lg bg-white  px-5 py-6 border border-gray-200 shadow sm:px-6">
              <h2
                className="text-base font-medium text-gray-900"
                id="recent-hires-title"
              >
                Resource owners ({owners.length})
              </h2>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {teams.map((team) => {
                    return (
                      <li key={team.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className=" bg-pink-500 w-4 rounded-full px-3.5 py-0.5">
                            <span className="block -ml-1 text-white">T</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {team.name}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              Team
                            </p>
                          </div>
                          <div>
                            <Link
                              href={`/teams/${team.id}`}
                              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {users.map((user) => {
                    return (
                      <li key={user.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          {user.avatarUrl && (
                            <div className="flex-shrink-0">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.avatarUrl}
                                alt=""
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            {user.role && (
                              <p className="truncate text-sm text-gray-500">
                                {user.role}
                              </p>
                            )}
                          </div>
                          <div>
                            <Link
                              href={`/users/${user.id}`}
                              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          {services && services.length > 0 && (
            <div className="rounded-lg bg-white  px-5 py-6 border border-gray-200 shadow sm:px-6">
              <h2
                className="text-base font-medium text-gray-900"
                id="recent-hires-title"
              >
                Linked service
              </h2>
              <div className="mt-6 flow-root">
                <ul
                  role="list"
                  className="-my-5 divide-y divide-gray-200 text-xs py-2"
                >
                  {services.map((service) => {
                    return (
                      <li
                        className="group border border-blue-500 border-l-8 rounded-sm rounded-l-md"
                        key={service.id}
                      >
                        <Link
                          href={`/services/${service.id}`}
                          className="group-odd:bg-gray-50 group-even:bg-white w-full flex items-center px-4 py-2 space-x-2 hover:group-odd:bg-gray-200  hover:group-even:bg-gray-200 hover:cursor-pointer"
                        >
                          {/* <img className="w-8 opacity-90" src={`/services/${resource.AWS.Service}.svg`} /> */}
                          <div>
                            <span className="block font-bold">
                              {service.name}
                            </span>
                            <span className="block text-xs text-gray-500">
                              {service.description}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const { frontmatter, ...source } = await getResourceByResourceTypeAndName(
    params.service,
    params.name,
  );
  const users = await getUsersByResource(frontmatter as any);
  const teams = await getTeamsByResource(frontmatter as any);

  const serviceId = (frontmatter as any).service;
  let services = [] as any;

  if (serviceId) {
    const service = await getServiceByName(serviceId);
    services = [service];
  }

  return { props: { source, frontmatter, users, teams, services } };
}

export async function getStaticPaths() {
  const resources = await getAllResources();
  const paths = resources.map((item) => ({
    params: {
      name: item.catalog.path,
      service: item.AWS.Service,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default ResourcePage;
