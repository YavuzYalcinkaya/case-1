import { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Team = ({ teamId, name }: { teamId: string; name: string }) => {
  const { removeTeam, removeUser, teams } = useTeamContext();
  const [showUsers, setShowUsers] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(
    teams.flatMap((team) => team.users).length / itemsPerPage
  );
  const paginatedUsers = teams
    .flatMap((team) => team.users)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const team = teams.find((t) => t.id === teamId);

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelectedUsers = () => {
    selectedUsers.forEach((userId) => removeUser(teamId, userId));
    setSelectedUsers([]);
    setCurrentPage(1);
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", my: 2 }}>
      <CardContent>
        <Box
          flexDirection={{ xs: "column", sm: "row" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{name} Ekibi</Typography>
          <Box>
            <IconButton
              color="primary"
              onClick={() => setShowUsers(!showUsers)}
            >
              {showUsers ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            <IconButton color="error" onClick={() => removeTeam(teamId)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        {showUsers && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Kullanıcılar:
            </Typography>

            {team?.users.length ? (
              <List
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Mobilde 1 sütun, desktop'ta 2 sütun
                  gap: 2,
                  width: "100%",
                }}
              >
                {paginatedUsers.map((user) => (
                  <ListItem
                    key={user.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      background: "#f9f9f9",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelect(user.id)}
                          />
                        }
                        label={user.name}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Bu ekipte henüz kullanıcı yok.
              </Typography>
            )}
          </>
        )}
      </CardContent>

      {showUsers && selectedUsers.length > 0 && (
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelectedUsers}
          >
            Seçilenleri Sil
          </Button>
        </CardActions>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Card>
  );
};

export default Team;
