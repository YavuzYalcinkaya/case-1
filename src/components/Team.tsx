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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Team = ({ teamId, name }: { teamId: string; name: string }) => {
  const { removeTeam, removeUser, teams } = useTeamContext();
  const [showUsers, setShowUsers] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", my: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
              <List>
                {team.users.map((user) => (
                  <ListItem key={user.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                        />
                      }
                      label={user.name}
                    />
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
    </Card>
  );
};

export default Team;
