import { LambdaResource } from "@/types";
import Link from "next/link";
import { getResourceName } from "@/util/catalog-data-frontend";
import { getAllResources, groupResourcesByService } from "@/util/resources";

interface Props {
  resources: Record<string, LambdaResource[]>;
  services: Record<string, LambdaResource[]>;
}

export default function Example({ resources, services }: Props) {
  return (
    <main className="sm:bg-top md:min-h-screen bg-gray-200 ">
      <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-18  lg:flex lg:justify-between ">
          <div className="max-w-7xl">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Overview
            </h2>
          </div>
        </div>
      </div>

      <main className="space-y-10 pb-20">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-lg bg-white  px-5 py-6 shadow sm:px-6 -mt-10">
          <section aria-labelledby="products-heading" className="pb-4">
            <h2 className="font-bold text-xl">By resource</h2>
          </section>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-xs">
            {Object.keys(resources).map((resourceType) => {
              return (
                <div
                  className="border border-gray-100 shadow-md"
                  key={resourceType}
                >
                  <div className="bg-gray-800 text-white py-2 px-4 font-bold text-sm flex justify-between items-center">
                    <span className="block">
                      {resourceType} ({resources[resourceType].length})
                    </span>
                    <Link
                      href="/resources"
                      className="block text-xs text-blue-300"
                    >
                      View all &rarr;
                    </Link>
                  </div>
                  <ul>
                    {resources[resourceType].slice(0, 5).map((item) => {
                      return (
                        <li className="group" key={item.catalog.path}>
                          <Link
                            href={`/resources/${item.AWS.Service}/${item.catalog.path}`}
                            className="group-odd:bg-gray-50 group-even:bg-white w-full flex items-center px-4 py-2 space-x-2 hover:group-odd:bg-gray-200  hover:group-even:bg-gray-200 hover:cursor-pointer"
                          >
                            <img
                              className="w-6 opacity-90"
                              src={`/services/${item.AWS.Service}.svg`}
                            />
                            <div>
                              <span className="block font-bold">
                                {getResourceName(item)}
                              </span>
                              <span className="block text-xs text-gray-500">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </main>

        {services && (
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-lg bg-white  px-5 py-6 shadow sm:px-6 -mt-10">
            <section aria-labelledby="products-heading" className="pb-4">
              <h2 className="font-bold text-xl">By Microservice</h2>
            </section>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-xs">
              {Object.keys(services).map((service) => {
                return (
                  <div
                    className="border border-gray-100 shadow-md"
                    key={service}
                  >
                    <div className="bg-gray-800 text-white py-2 px-4 font-bold text-sm flex justify-between items-center">
                      <span className="block">
                        {service} ({services[service].length})
                      </span>
                      <Link
                        href={`/services/${service}`}
                        className="block text-xs text-blue-300"
                      >
                        View &rarr;
                      </Link>
                    </div>
                    <ul>
                      {services[service].slice(0, 5).map((resource) => {
                        return (
                          <li className="group" key={resource.catalog.path}>
                            <Link
                              href={`/resources/${resource.AWS.Service}/${resource.catalog.path}`}
                              className="group-odd:bg-gray-50 group-even:bg-white w-full flex items-center px-4 py-2 space-x-2 hover:group-odd:bg-gray-200  hover:group-even:bg-gray-200 hover:cursor-pointer"
                            >
                              <img
                                className="w-6 opacity-90"
                                src="/services/lambda.svg"
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
                );
              })}
            </div>
          </main>
        )}
      </main>
    </main>
  );
}

export async function getStaticProps({ params }: any) {
  const resources = await getAllResources();
  const services = await groupResourcesByService(resources);

  const lambdaResources = resources.filter(
    (item) => item.AWS.Service === "lambda",
  );
  const stepFunctionResources = resources.filter(
    (item) => item.AWS.Service === "step-function",
  );

  return {
    props: {
      resources: {
        "AWS Lambda": lambdaResources,
        "AWS Step Functions": stepFunctionResources,
      },
      services: services || null,
    },
  };
}
