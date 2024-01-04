import ResourceGrid from "@/components/ResourceGrid";
import ServiceGrid from "@/components/ServiceGrid";
import TeamGrid from "@/components/TeamGrid";
import { Resource, Service, Team, User } from "@/types";
import { getAllResourcesForUser } from "@/util/resources";
import { getAllServicesByUserId } from "@/util/services";
import { getTeamsByUser } from "@/util/teams";
import { getAllUsers, getUserByUserId } from "@/util/users";

interface Props {
  resources: Resource[];
  services: Service[];
  user: User;
  teams?: Team[];
}

export default function UserPage({ resources, services, user, teams }: Props) {
  return (
    <div className="flex relative min-h-screen">
      <div className="flex-1 ">
        <div className="py-8 xl:py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl xl:grid xl:grid-cols-4">
            <div className="xl:col-span-3 xl:pr-8 xl:border-r xl:border-gray-200 min-h-screen">
              <div className="xl:border-b pb-4 flex justify-between ">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900 relative">
                    {user.name}
                  </h1>
                </div>
              </div>

              {resources.length === 0 && services.length === 0 && (
                <div className="py-4 prose">
                  <h5>
                    {user.name} does not currently own any resources or
                    services.
                  </h5>
                  <p>
                    To add them to resources or services, you can add{" "}
                    <code>{user.id}</code> to the resource or service.{" "}
                  </p>
                </div>
              )}

              {teams && teams.length > 0 && (
                <div className="border-b border-gray-100 pb-6 space-y-2">
                  <h1 className="text-lg font-bold text-gray-800 relative mt-4">
                    Teams ({teams.length})
                  </h1>
                  <TeamGrid teams={teams} />
                </div>
              )}
              {resources.length > 0 && (
                <div className="border-b border-gray-100 pb-6 space-y-2">
                  <h1 className="text-lg font-bold text-gray-800 relative mt-4">
                    Owner of Resources ({resources.length})
                  </h1>
                  <ResourceGrid resources={resources} />
                </div>
              )}
              {services.length > 0 && (
                <div className="border-b border-gray-100 pb-6 space-y-2">
                  <h1 className="text-lg font-bold text-gray-800 relative mt-4 ">
                    Owner of Services ({services.length})
                  </h1>
                  <ServiceGrid services={services} />
                </div>
              )}
            </div>
            <div className="px-8">
              <div className="flex items-center space-x-5 mt-4 ">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={user.avatarUrl}
                      alt=""
                    />
                    <span
                      className="absolute inset-0 shadow-inner rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <p className="text-sm font-medium text-gray-500">
                    {user.role}
                  </p>
                </div>
              </div>
              <div className="mt-6 flow-root border-t border-gray-200 py-6 text-sm">
                {user.summary}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const { id: userId } = params;

  const resources = await getAllResourcesForUser(userId);
  const services = await getAllServicesByUserId(userId);
  const user = await getUserByUserId(userId);

  // @ts-ignore
  const teams = await getTeamsByUser(user);

  return {
    props: {
      resources,
      services,
      user,
      teams,
    },
  };
};

export async function getStaticPaths() {
  const users = await getAllUsers();

  const paths = users.map((user) => ({ params: { id: user.id } }));

  return {
    paths,
    fallback: false,
  };
}
