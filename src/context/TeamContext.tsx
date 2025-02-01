import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  teamId: string;
}

interface Team {
  id: string;
  name: string;
  users: User[];
}

interface TeamContextType {
  teams: Team[];
  addTeam: (name: string) => void;
  addUser: (teamId: string, userName: string) => void;
  removeUser: (userId: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const addTeam = (name: string) => {
    const newTeam: Team = { id: crypto.randomUUID(), name, users: [] };
    setTeams((prev) => [...prev, newTeam]);
  };

  const addUser = (teamId: string, userName: string) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? { ...team, users: [...team.users, { id: crypto.randomUUID(), name: userName, teamId }] }
          : team
      )
    );
  };

  const removeUser = (userId: string) => {
    setTeams((prev) =>
      prev.map((team) => ({
        ...team,
        users: team.users.filter((user) => user.id !== userId),
      }))
    );
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, addUser, removeUser }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeamContext must be used within a TeamProvider");
  return context;
};
