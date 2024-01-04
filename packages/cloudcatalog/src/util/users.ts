import { User } from "@/types";
import config from "../../cloudcatalog.config";

export const getAllUsers = (): Promise<User[]> => {
  const users = config.users as User[];
  return Promise.resolve(users);
};

export const getUserByUserId = async (
  userId: string,
): Promise<User | undefined> => {
  const allUsers = await getAllUsers();
  return allUsers.find((user) => user.id === userId);
};
