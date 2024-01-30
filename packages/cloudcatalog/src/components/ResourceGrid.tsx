import { Resource } from "@/types";
import { getResourceName } from "@/util/catalog-data-frontend";
import { formatBytes, formatSecondsToFriendlyString } from "@/util/formatters";
import {
  ArchiveBoxXMarkIcon,
  ArrowsRightLeftIcon,
  BoltIcon,
  ClockIcon,
  CommandLineIcon,
  CpuChipIcon,
  DocumentIcon,
  EyeIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface Props {
  resources: Resource[];
}

// TODO: Clean this up!
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

  if (resource.AWS.Service === "sqs") {
    return [
      {
        icon: ClockIcon,
        value: resource.AWS.MessageRetentionPeriod
          ? `Retention: ${formatSecondsToFriendlyString(
              resource.AWS.MessageRetentionPeriod,
            )}`
          : "Retention: Unknown",
        class: "text-green-700",
      },
      {
        icon: EyeIcon,
        value: resource.AWS.VisibilityTimeout
          ? `Visibility timeout: ${resource.AWS.VisibilityTimeout / 60} minutes`
          : "",
        class: "text-green-700",
      },
    ];
  }

  if (resource.AWS.Service === "dynamodb") {
    return [
      {
        icon: PowerIcon,
        value: resource.AWS.TableStatus,
        class: "text-green-700",
      },
      {
        icon: ArrowsRightLeftIcon,
        value: `Stream ${
          resource.AWS.StreamSpecification?.StreamEnabled
            ? "Enabled"
            : "Disabled"
        }`,
        class: "text-green-700",
      },
      {
        icon: ArchiveBoxXMarkIcon,
        value: `Deletion protection ${
          resource.AWS.DeletionProtectionEnabled ? "enabled" : "disabled"
        }`,
        class: "text-green-700",
      },
    ];
  }

  if (resource.AWS.Service === "appsync") { // FIXME
    return [
      {
        icon: PowerIcon,
        value: resource.AWS.TableStatus,
        class: "text-green-700",
      },
      {
        icon: ArrowsRightLeftIcon,
        value: `Stream ${
          resource.AWS.StreamSpecification?.StreamEnabled
            ? "Enabled"
            : "Disabled"
        }`,
        class: "text-green-700",
      },
      {
        icon: ArchiveBoxXMarkIcon,
        value: `Deletion protection ${
          resource.AWS.DeletionProtectionEnabled ? "enabled" : "disabled"
        }`,
        class: "text-green-700",
      },
    ];
  }

  return [];
};

const getStylesForResource = (resource: Resource) => {
  switch (resource.AWS.Service) {
    case "lambda":
      return "border-orange-400 hover:bg-orange-100";
    case "step-function":
      return "border-pink-500 hover:bg-pink-100";
    case "sqs":
      return "border-pink-500 hover:bg-pink-100";
    case "appsync":
      return "border-red-500 hover:bg-red-100";
    default:
      return "border-gray-500";
  }
};

export const ResourceComponent = ({ resource }: { resource: Resource }) => {
  const tagsForResources = getTagsForResourceType(resource);
  const stylesForResouce = getStylesForResource(resource);

  const takeToDocs = (e: any) => {
    e.preventDefault();
    window.location.href = "http://cloudcatalog.dev";
  };

  return (
    <Link
      href={`/resources/${resource.AWS.Service}/${resource.catalog.path}`}
      key={resource.catalog.path}
      className={` hover:bg-gray-100 rounded-md py-4 px-4 flex flex-col justify-between space-y-2 border border-l-8 resource ${resource.AWS.Service} ${stylesForResouce}`}
    >
      {/* <img src={`/services/${resource.AWS.Service}.svg`} className='w-12'/> */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="flex">
              <span className="text-sm font-bold">
                {getResourceName(resource)}
              </span>
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
          <div>
            <img
              src={`/services/${resource.AWS.Service}.svg`}
              className="opacity-80 rounded-md w-10"
            />
          </div>
        </div>
      </div>
      {resource.catalog.generic && (
        <div>
          <button
            onClick={takeToDocs}
            className="text-xs text-gray-600 underline"
          >
            Resource enrichment not yet supported &rarr;
          </button>
        </div>
      )}
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
