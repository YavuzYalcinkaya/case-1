import { useTeamContext } from "../useTeamContext";
import Team from "./Team";
import TeamForm from "./TeamForm";
import UserForm from "./UserForm";
import { PageContainer } from "../styled";
import { Box } from "@mui/material";

const TeamList = () => {
  const { teams } = useTeamContext();

  return (
    <PageContainer>
      <h1>Ekibinizi Yönetin</h1>

      {/* Ekip ekleme formu */}
      <Box mb={2}>
        <TeamForm />
      </Box>

      {/* Kullanıcı ekleme formu */}
      {teams.length > 0 && (
        <Box mb={2}>
          <UserForm />
        </Box>
      )}

      {/* Mevcut ekipleri listeleme */}
      {teams.length === 0 ? (
        <p>Henüz bir ekip oluşturulmadı.</p>
      ) : (
        teams.map((team) => (
          <Box key={team.id} mb={2}>
            <Team teamId={team.id} name={team.name} />
          </Box>
        ))
      )}
    </PageContainer>
  );
};

export default TeamList;
