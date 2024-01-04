import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import { LambdaResource, Service, Team, User } from "@/types";
import { getResourceName } from "@/util/catalog-data-frontend";
import { getAllResourcesForService } from "@/util/resources";
import {
  getAllServices,
  getServiceByName,
  getUsersByService,
} from "@/util/services";
import { getTeamsByService } from "@/util/teams";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import React from "react";

interface Props {
  source: MDXRemoteSerializeResult;
  service: Service;
  users?: User[];
  teams?: Team[];
}

const components = (resource: Service) => {
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
      return (
        <SyntaxHighlighter language="sh" {...props}>
          {props.children}
        </SyntaxHighlighter>
      );
    },
  };
};
const ResourcePage = ({ source, service, users = [], teams = [] }: Props) => {
  const owners = [...users, ...teams];
  //   const overview = buildOverviewForResource(resource);
  return (
    <div className="pb-20 ">
      <div className="bg-gray-800 border-b-8 border-yellow-600">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:flex lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {service.name}
            </h2>
            {service.description && (
              <p className="mt-5 text-xl text-gray-400">
                {service.description}
              </p>
            )}
          </div>
          <div className="w-full max-w-xs -mt-10">
            {/* <RectangleGroupIcon className="text-gray-200 opacity-10 w-40" /> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto  -mt-10 ">
        <main className="border-r border-gray-200 pr-4 col-span-8 rounded-lg bg-white px-5 py-6 shadow-xl sm:px-6 ">
          <div className="prose prose-lg">
            <MDXRemote {...source} components={components(service)} />
          </div>
        </main>
        <div className="col-span-4 space-y-2  ">
          {service.resources && service.resources.length > 0 && (
            <div className="rounded-lg bg-white border border-gray-200 shadow  px-5 py-6 shadow sm:px-6">
              <h2
                className="text-base font-medium text-gray-900"
                id="recent-hires-title"
              >
                Resources in service ({service.resources.length})
              </h2>
              <div className="mt-2 flow-root text-xs">
                <ul className="space-y-2">
                  {service.resources.map((resource) => {
                    return (
                      <li
                        className="group border border-gray-300 rounded-sm"
                        key={resource.catalog.path}
                      >
                        <Link
                          href={`/resources/${resource.AWS.Service}/${resource.catalog.path}`}
                          className="group-odd:bg-gray-50 group-even:bg-white w-full flex items-center px-4 py-2 space-x-2 hover:group-odd:bg-gray-200  hover:group-even:bg-gray-200 hover:cursor-pointer"
                        >
                          <img
                            className="w-8 opacity-90"
                            src={`/services/${resource.AWS.Service}.svg`}
                          />
                          <div>
                            <span className="block font-bold">
                              {getResourceName(resource)}
                            </span>
                            <span className="block text-xs text-gray-500">
                              {resource.description}
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
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.avatarUrl}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {user.role}
                            </p>
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
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const service = await getServiceByName(params.name);
  if (!service) return { props: {} };
  const resources = await getAllResourcesForService(service.id);

  const users = await getUsersByService(service);
  const teams = await getTeamsByService(service);

  return {
    props: {
      source: service.source,
      service: { ...service, resources },
      users,
      teams,
    },
  };
}

export async function getStaticPaths() {
  const services = await getAllServices();
  const paths = services.map((service) => ({
    params: {
      name: service.id,
      service: service.name,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default ResourcePage;
