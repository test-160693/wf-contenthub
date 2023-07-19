import React, { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MenuItem, styled } from '@mui/material';
import apiService from '../services/apiServices';
import AssignUsers from './AssignUsers';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AssignRoles from './AssignRoles';


const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [assignUsersDialogOpen, setAssignUsersDialogOpen] = useState(false);
  const [assignRolesDialogOpen, setAssignRolesDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const groups_response  = await apiService.get('/api/groups');
        setGroups(groups_response.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);


  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        enableColumnFilter: false,
        header: 'ID',
      },
      //column definitions...
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
    ],
    [],
  );

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const handleAssignUsersDialog = (group) => {
    setGroup(group.original);
    setAssignUsersDialogOpen(true);
  };

  const handleAssignUsersCloseDialog = () => {
    setAssignUsersDialogOpen(false);
  };

  const handleAssignRolesDialog = (group) => {
    setGroup(group.original);
    setAssignRolesDialogOpen(true);
  };

  const handleAssignRolesCloseDialog = () => {
    setAssignRolesDialogOpen(false);
  };


  return (
    <Container>
        <MaterialReactTable
          columns={columns}
          data={groups}
          enableStickyHeader
          positionActionsColumn="last"
          enableRowActions
          renderRowActionMenuItems={({ row }) => [
            <MenuItem key="edit" onClick={() => handleAssignUsersDialog(row)}>
              Edit
            </MenuItem>,
            <MenuItem key="edit" onClick={() => handleAssignUsersDialog(row)}>
              Assign Users
            </MenuItem>,
            <MenuItem key="edit" onClick={() => handleAssignRolesDialog(row)}>
              Assign Roles
            </MenuItem>,
            <MenuItem key="delete" onClick={() => alert('Delete')}>
              Delete
            </MenuItem>,
          ]}
        />
        <Dialog open={assignUsersDialogOpen} onClose={handleAssignUsersCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Assign Users</DialogTitle>
          <DialogContent>
            <AssignUsers group = {group}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAssignUsersCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
      </Dialog>
      <Dialog open={assignRolesDialogOpen} onClose={handleAssignRolesCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Assign Roles</DialogTitle>
          <DialogContent>
            <AssignRoles group = {group}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAssignRolesCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Groups;