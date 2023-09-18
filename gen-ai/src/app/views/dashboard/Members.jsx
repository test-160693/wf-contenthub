import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MenuItem, styled } from '@mui/material';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AssignRoles from './AssignRoles';


const Members = (props) => {
  const [assignRolesDialogOpen, setAssignRolesDialogOpen] = useState(false);
  const [member, setMember] = useState(null);

  const members = props.members;

  console.log("data === "+JSON.stringify(props.members));


  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false,
        header: 'ID',
      },
      //column definitions...
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'role',
        header: 'Role',
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

  const handleAssignRolesDialog = (member) => {
    setMember(member.original);
    setAssignRolesDialogOpen(true);
  };

  const handleAssignRolesCloseDialog = () => {
    setAssignRolesDialogOpen(false);
  };


  return (
    <Container>
        <MaterialReactTable
          columns={columns}
          data={members}
          enableStickyHeader
          positionActionsColumn="last"
          enableRowActions
          renderRowActionMenuItems={({ row }) => [
            <MenuItem key="edit" onClick={() => handleAssignRolesDialog(row)}>
              Edit
            </MenuItem>,
            <MenuItem key="edit" onClick={() => handleAssignRolesDialog(row)}>
              Assign Roles
            </MenuItem>,
            <MenuItem key="delete" onClick={() => alert('Delete')}>
              Delete
            </MenuItem>,
          ]}
        />
        <Dialog open={assignRolesDialogOpen} onClose={handleAssignRolesCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>Assign Roles</DialogTitle>
            <DialogContent>
                <AssignRoles member = {member}/>
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

export default Members;