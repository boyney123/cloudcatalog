import { FolderIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useCatalogConfig } from "@/hooks/CloudCatalog";
import Link from "next/link";

import { LifebuoyIcon } from "@heroicons/react/20/solid";

const cards = [
  {
    name: "Explore resources",
    description:
      "Explore AWS resources that have been imported into the catalog. ",
    icon: FolderIcon,
    href: "/resources",
  },
  {
    name: "Explore Services",
    description: "Explore your services. Services are made up from resources.",
    icon: LifebuoyIcon,
    href: "/services",
  },
  {
    name: "Teams",
    description:
      "Explore teams within your company. Understand who owns which resource or service.",
    icon: UserGroupIcon,
    href: "/teams",
  },
];

export default function Example() {
  const { title, tagline } = useCatalogConfig();

  return (
    <div className="bg-gray-800">
      <div className="relative isolate">
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
          <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">{tagline}</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
              {cards.map((card) => (
                <Link
                  href={card.href}
                  key={card.name}
                  className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:opacity-90 hover:ring-white"
                >
                  <card.icon
                    className="h-7 w-5 flex-none text-indigo-400"
                    aria-hidden="true"
                  />
                  <div className="text-base leading-7">
                    <h3 className="font-semibold text-white">{card.name}</h3>
                    <p className="mt-2 text-gray-300">{card.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
