import {
  ArrowDownTrayIcon,
  ChevronRightIcon,
  DocumentIcon,
  GlobeAmericasIcon,
  GlobeEuropeAfricaIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import codeStyle from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { Prism as PrismSyntaxHighlighter } from "react-syntax-highlighter";

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

const features2 = [
  {
    name: "Push to deploy.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: LockClosedIcon,
  },
  {
    name: "Database backups.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ServerIcon,
  },
];

const features = [
  {
    name: "Import resources.",
    description:
      "Use the CloudCatalog CLI to import resources directly into your Catalog.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Static website",
    description: "Catalog renders a static website you can host anywhere.",
    icon: GlobeAmericasIcon,
  },
  {
    name: "Users and teams",
    description:
      "Create users and teams in your Catalog. Assign them resources or services.",
    icon: UserGroupIcon,
  },
  {
    name: "Powered by markdown",
    description:
      "Every resource is a markdown file, you can add as much detail as you want with supported CloudCatalog components.",
    icon: DocumentIcon,
  },
  {
    name: "Keep up to date",
    description: "Use CloudCatalog utils to keep your resources up to date.",
    icon: ArrowDownTrayIcon,
  },
  {
    name: "Community",
    description:
      "Join the community, learn from each other and help shape the project.",
    icon: GlobeEuropeAfricaIcon,
  },
];

const ExampleCode = `---
service: user-service
description: Function that is triggered from API Gateway
AWS:
    FunctionName: ApiGatewayToEventbridgeVali-testmyfunction6C759E94-brgGihQlqYoj
    MemorySize: 1024
    Runtime: nodejs16.x
    Handler: index.handler
    CodeSize: 210432
    Service: lambda
    Account: 123245789
catalog:
    updatedAt: '2024-01-02T20:41:55.360Z'
    parent: lambda
    path: ApiGatewayToEventbridgeVali-testmyfunction6C759E94-brgGihQlqYoj
---

### Why was this function created?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula et orci pellentesque volutpat. In imperdiet augue sit amet imperdiet ultricies. Etiam eget dui elementum, tempor ligula quis, consectetur eros. Suspendisse sodales mattis ex, nec tempor lorem. Maecenas eget risus suscipit, gravida lectus eu, dictum sapien. Nunc efficitur sem eget dui tempus aliquam. Aenean ultricies porta velit. Quisque tempus in nisl nec pulvina

### Trigger this function with test data

<CLICommand>aws lambda invoke --function-name /FunctionName/ </CLICommand>
`;

export default function Example() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 ">
        <div className="mx-auto max-w-7xl md:pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-20 lg:pb-14 ">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                  Documentation tool for{" "}
                  <span className="text-orange-500">AWS Architectures</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  CloudCatalog is an Open Source project that helps you document
                  your{" "}
                  <span className="text-orange-400 font-bold">resources</span>,{" "}
                  <span className="text-orange-400 font-bold">services</span>{" "}
                  and <span className="text-orange-400 font-bold">owners</span>.
                  <p className="text-xs mt-3">
                    Powered by markdown, components and CLI tools.
                  </p>
                </p>
                <div className="mt-6 flex items-center gap-x-6">
                  <a
                    href="/docs/overview/getting-started/installation"
                    className="rounded-md bg-orange-600 px-5 py-4 text-md font-semibold text-white shadow-sm hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Start documenting &rarr;
                  </a>
                  <a
                    href="/docs/overview/intro"
                    className="text-md font-semibold leading-6 text-gray-900"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen ">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-orange-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            MyLambdaFunction.md
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">
                            EventBridgeBus.md
                          </div>
                        </div>
                      </div>
                      <div className="-mt-1 text-xs">
                        <PrismSyntaxHighlighter
                          style={codeStyle}
                          language={"markdown"}
                          wrapLines
                          className="overflow-auto"
                        >
                          {ExampleCode}
                        </PrismSyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      <div className="bg-gray-100 py-8 md:py-24 px-6 lg:px-0  ">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-orange-600">
              Start documenting in minutes
            </h2>
            {/* <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">CLI tools designed to help</p> */}
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Static site generator for your architecture
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Import your AWS resources into CloudCatalog powered by the{" "}
              <span className="text-gray-800 font-bold">@cloudcatalog/cli</span>
              .
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              src="/img/screenshot.png"
              alt="App screenshot"
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              width={2432}
              height={1442}
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-100 pt-[7%] graident-image" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon
                    className="absolute left-1 top-1 h-5 w-5 text-orange-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>{" "}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-8 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-orange-600">
                  Resources
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Import AWS resources
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Import and document your AWS resources directly into your
                  Catalog. Use markdown to document your resources and enrich
                  them with custom MDX components.
                </p>
                <div className="mt-8">
                  <a
                    href="https://app.cloudcatalog.dev/resources/lambda/payment-emails"
                    class="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
                  >
                    View example →
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <img
                src="/img/screenshot.png"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-gray-100 py-8 pb-24 md:py-24 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
            <div className="lg:pr-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-orange-600">
                  Ownership
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Create users and teams
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Assign your resources or services owners. Owners can be users
                  or teams. Let others know who owns which resource or service
                  in your architecture.
                </p>
                <div className="mt-8">
                  <a
                    href="https://app.cloudcatalog.dev/teams/payment-team"
                    class="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
                  >
                    View example →
                  </a>
                </div>
              </div>
            </div>
            <img
              src="/img/teams.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      <div className="bg-white   sm:pb-24">
        <div className="bg-gray-900 pb-10 xl:pb-0">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <img
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                  src="https://pbs.twimg.com/profile_images/1262283153563140096/DYRDqKg6_400x400.png"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate pt-6 sm:pt-12">
                <svg
                  viewBox="0 0 162 128"
                  fill="none"
                  aria-hidden="true"
                  className="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
                >
                  <path
                    id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  />
                  <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86} />
                </svg>
                <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                  <p>
                    Documentation is often overlooked and often required to help
                    scale teams and understand domains. CloudCatalog was built
                    to help you document your AWS architectures.
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-white">
                    <a
                      href="https://twitter.com/boyney123"
                      className="text-blue-400"
                    >
                      David Boyne | @boyney123
                    </a>
                  </div>
                  <div className="mt-1 text-gray-400">
                    Developer Advocate @ AWS - Creator of EventCatalog and
                    CloudCatalog
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 md:pt-24 md:pb-0  lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to start using{" "}
              <span className="text-orange-500 font-bold">CloudCatalog?</span>
              <br />
              Get started within minutes.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <a
                href="/docs/overview/getting-started/installation"
                className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Get started
              </a>
              <a
                href="/docs/overview/intro"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
