import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { Team } from "@/types";
import TeamGrid from "@/components/TeamGrid";
import { getAllTeams } from "@/util/teams";

interface Props {
  teams: Team[];
}

export default function Teams({ teams }: Props) {
  return (
    <div className="bg-white min-h-screen">
      <div>
        {/* Mobile filter dialog */}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Teams ({teams.length})
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button> */}
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="lg:col-span-4">
                <TeamGrid teams={teams} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const teams = await getAllTeams();

  return {
    props: { teams },
  };
};
