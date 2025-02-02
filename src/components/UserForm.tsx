import React, { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import { Card, AddButton } from "../styled";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  Checkbox,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserForm = () => {
  const { teams, addUser, removeUser } = useTeamContext();
  const [userName, setUserName] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<
    { teamId: string; userId: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorMessageUsers, setErrorMessageUsers] = useState<string | null>(
    null
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setErrorMessageUsers(null);

    if (!selectedTeam) {
      setErrorMessage("Ekip seçiniz!");
      return;
    }
    if (!userName) {
      setErrorMessageUsers("Kullanıcı seçiniz!");
      return;
    }
    if (userName.trim() && selectedTeam) {
      addUser(selectedTeam, userName);
      setUserName("");
    }
  };

  const handleCheckboxChange = (teamId: string, userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.some((u) => u.userId === userId)
        ? prevSelected.filter((u) => u.userId !== userId)
        : [...prevSelected, { teamId, userId }]
    );
  };

  const handleBulkDelete = () => {
    selectedUsers.forEach(({ teamId, userId }) => removeUser(teamId, userId));
    setSelectedUsers([]);
  };

  return (
    <Card>
      <Typography variant="h5" gutterBottom>
        Kullanıcı Ekle
      </Typography>

      {/* Kullanıcı Ekleme Formu */}
      <Box component="form" onSubmit={handleSubmit} display="flex" gap="10px">
        <Select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="" disabled>
            Ekip Seç
          </MenuItem>
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}

        <TextField
          label="Kullanıcı Adı"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        {errorMessageUsers && (
          <FormHelperText error>{errorMessageUsers}</FormHelperText>
        )}
        <AddButton type="submit">Ekle</AddButton>
      </Box>

      {/* Kullanıcı Listesi */}
      {teams.some((team) => team.users.length > 0) && (
        <>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Mevcut Kullanıcılar:
          </Typography>
          <List>
            {teams.flatMap((team) =>
              team.users.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={selectedUsers.some((u) => u.userId === user.id)}
                    onChange={() => handleCheckboxChange(team.id, user.id)}
                  />
                  <Typography>
                    {user.name} ({team.name})
                  </Typography>
                </ListItem>
              ))
            )}
          </List>

          {/* Seçili Kullanıcıları Sil Butonu */}
          {selectedUsers.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Seçilenleri Sil
            </Button>
          )}
        </>
      )}
    </Card>
  );
};

export default UserForm;
