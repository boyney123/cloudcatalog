import { useCatalogConfig } from "@/hooks/CloudCatalog";
import Link from "next/link";

const navigation = {
  main: [
    { name: "Overview", href: "/overview" },
    { name: "Resources", href: "/resources" },
    { name: "Services", href: "/services" },
    { name: "Teams", href: "/teams" },
    { name: "Users", href: "/users" },
    { name: "Discord", href: "https://discord.gg/d8Apdbhrkg" },
  ],
};

export default function Footer() {
  const { organizationName } = useCatalogConfig();

  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-10 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              {item.href.includes("https") && (
                <a
                  href={item.href}
                  target="_blank"
                  className="text-sm leading-6 text-gray-200 hover:text-gray-200"
                >
                  {item.name}
                </a>
              )}
              {!item.href.includes("https") && (
                <Link
                  href={item.href}
                  className="text-sm leading-6 text-gray-200 hover:text-gray-200"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          <a
            href="https://cloudcatalog.dev"
            target="_blank"
            className="underline"
          >
            CloudCatalog
          </a>{" "}
          designed for {organizationName}
        </p>
      </div>
    </footer>
  );
}
