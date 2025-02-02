import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { useTeamContext } from "../useTeamContext";
import { Box, Typography } from "@mui/material";

const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff6f61", "#00c49f"];

const Charts = () => {
  const { teams } = useTeamContext();

  const data = teams.map((team, index) => ({
    name: team.name,
    users: team.users.length,
    fill: colors[index % colors.length], // Renklerin döngüsünü sağlar
  }));

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
    >
      <Typography variant="h4" color="primary">
        Takım Yönetimi
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" gap={4}>
        {/* Pie Chart */}
        <ResponsiveContainer width={400} height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="users"
              nameKey="name"
              label
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `Kullanıcı: ${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        {/* Bar Chart */}
        <ResponsiveContainer width={500} height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* Tek bir bar için her takımın kullanıcı sayısını göster */}
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Additional text or statistics */}
      <Typography variant="h6" color="textSecondary">
        Toplam Takım: {teams.length} | Toplam Kullanıcı:{" "}
        {teams.reduce((sum, team) => sum + team.users.length, 0)}
      </Typography>
    </Box>
  );
};

export default Charts;
