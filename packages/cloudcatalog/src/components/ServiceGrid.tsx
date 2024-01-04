import { Resource, Service } from "@/types";
import { getResourceName } from "@/util/catalog-data-frontend";
import Link from "next/link";
import React from "react";

interface Props {
  services: Service[];
}

const ServiceGrid = ({ services }: Props) => {
  return (
    <div className="grid gap-5 grid-cols-2">
      {services.map((service: Service) => {
        return (
          <Link
            href={`/services/${service.id}`}
            key={service.id}
            className=" hover:bg-gray-100 rounded-md  py-4 px-4 flex flex-col justify-between space-y-2 border border-l-8 border-blue-400"
          >
            {/* <img src={`/services/${resource.AWS.Service}.svg`} className='w-12'/> */}
            <div>
              <div className="flex">
                <span className="text-sm font-bold">{service.name}</span>
              </div>
              <div>
                <span className="text-xs leading-2 block">
                  {service.description}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ServiceGrid;
