import { Team } from "@/types";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface Props {
  teams: Team[];
}

const TeamGrid = ({ teams }: Props) => {
  return (
    <div className="grid gap-5 grid-cols-2">
      {teams.map((team) => {
        return (
          <Link
            href={`/teams/${team.id}`}
            key={team.id}
            className=" hover:bg-gray-100 rounded-md  py-4 px-4 flex flex-col justify-between space-y-2 border border-l-8 border-pink-400"
          >
            {/* <img src={`/services/${resource.AWS.Service}.svg`} className='w-12'/> */}
            <div>
              <div className="flex">
                <span className="text-sm font-bold">{team.name}</span>
              </div>
              <div>
                <span className="text-xs leading-2 block">{team.summary}</span>
              </div>
            </div>
            {team.slackChannel && (
              <div className="flex space-x-4 text-xs pt-2 relative bottom-0 left-0">
                <div className="font-medium text-gray-700 text-md items-center  flex">
                  <ChatBubbleLeftRightIcon
                    className={`w-4 inline-block mr-1`}
                  />
                  {team.slackChannel}
                </div>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default TeamGrid;
