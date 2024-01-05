import { LambdaAWSResource, Resource } from "@/types";
import { getResourceName } from "@/util/catalog-data-frontend";
import { formatBytes } from "@/util/formatters";
import {
  BoltIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  DocumentIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface Props {
  resources: Resource[];
}

const getTagsForResourceType = (resource: Resource) => {
  if (resource.AWS.Service === "lambda") {
    return [
      {
        icon: CommandLineIcon,
        value: resource.AWS.Runtime,
        class: "text-green-700",
      },
      {
        icon: CpuChipIcon,
        value: formatBytes(resource.AWS.MemorySize),
        class: "text-green-700",
      },
      {
        icon: DocumentIcon,
        value: resource.AWS.Handler,
        class: "text-green-700",
      },
    ];
  }

  if (resource.AWS.Service === "step-function") {
    return [
      {
        icon: CommandLineIcon,
        value: `LOGGING (${resource.AWS.LoggingConfiguration})`,
        class: "text-green-700",
      },
      {
        icon: PowerIcon,
        value: resource.AWS.Status,
        class: "text-green-700",
      },
      {
        icon: resource.AWS.Type === "EXPRESS" ? BoltIcon : InboxIcon,
        value: resource.AWS.Type,
        class: "text-green-700",
      },
    ];
  }

  return [];
};

const getStylesForResource = (resource: Resource) => {
  switch (resource.AWS.Service) {
    case "lambda":
      return "border-orange-400";
    case "step-function":
      return "border-pink-500";
    default:
      return "border-gray-500";
  }
};

export const ResourceComponent = ({ resource }: { resource: Resource }) => {
  const tagsForResources = getTagsForResourceType(resource);
  const stylesForResouce = getStylesForResource(resource);
  return (
    <Link
      href={`/resources/${resource.AWS.Service}/${resource.catalog.path}`}
      key={resource.catalog.path}
      className={` hover:bg-gray-100 rounded-md py-4 px-4 flex flex-col justify-between space-y-2 border border-l-8 ${stylesForResouce}`}
    >
      {/* <img src={`/services/${resource.AWS.Service}.svg`} className='w-12'/> */}
      <div className="space-y-2">
        <div className="flex">
          <span className="text-sm font-bold">{getResourceName(resource)}</span>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {resource.AWS.Service}
          </span>
        </div>
        <div>
          <span className="text-xs leading-2 block">
            {resource.description}
          </span>
        </div>
      </div>
      {tagsForResources && tagsForResources.length > 0 && (
        <div className="flex space-x-4 text-xs pt-2 relative bottom-0 left-0">
          {tagsForResources.map((tag, index) => {
            return (
              <div
                className="font-medium text-gray-700 text-md items-center  flex"
                key={index}
              >
                <tag.icon className={`w-4 inline-block mr-1 ${tag.class}`} />
                <span>{tag.value}</span>
              </div>
            );
          })}
        </div>
      )}
    </Link>
  );
};

const ResourceGrid = ({ resources }: Props) => {
  return (
    <div className="grid gap-5 grid-cols-2">
      {resources.map((resource) => {
        return <ResourceComponent key={resource.AWS.Arn} resource={resource} />;
      })}
    </div>
  );
};

export default ResourceGrid;
