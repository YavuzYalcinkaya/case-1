import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
  users: User[];
}

interface TeamContextType {
  teams: Team[];
  addTeam: (name: string) => void;
  removeTeam: (teamId: string) => void;
  addUser: (teamId: string, userName: string) => void;
  removeUser: (teamId: string, userId: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const addTeam = (name: string) => {
    setTeams([...teams, { id: uuidv4(), name, users: [] }]);
  };

  const removeTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId));
  };

  const addUser = (teamId: string, userName: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, users: [...team.users, { id: uuidv4(), name: userName }] } : team
      )
    );
  };

  const removeUser = (teamId: string, userId: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, users: team.users.filter((user) => user.id !== userId) } : team
      )
    );
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, removeTeam, addUser, removeUser }}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext;