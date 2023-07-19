import React, { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import apiService from '../services/apiServices';
import { Button, styled, Snackbar, Alert } from '@mui/material';


const AssignRoles = (props) => {
  const [roles, setRoles] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState({});
  const [severity, setSeverity] = React.useState({});

  const { group } = props;

  console.log("rowSelection === "+JSON.stringify(Object.keys(rowSelection)));

  useEffect(() => {
    (async () => {
      try {
        const roles_response  = await apiService.get('/api/roles');
        const customRow = {};
        if(group && group.role_ids != null) {
            roles_response.data.map((role) => {
                if(group.role_ids.includes(role._id)) {
                    customRow[role._id] = true;
                }
                return role;
            });
        }
        setRowSelection(customRow);
        setRoles(roles_response.data);
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

  const assignRolesToGroup = () => {
    const integerList = Object.keys(rowSelection).map((str) => parseInt(str));
    apiService.put('/api/groups/'+group._id+'/roles', { role_ids: integerList })
      .then((response) => {
        setResponseMessage("Assigned Roles Successfully !");
        setSeverity("success");
        setOpen(true);
      })
      .catch((error) => {
        setResponseMessage("Failed to Assign Roles to Group !");
        setSeverity("error");
        setOpen(true);
      });
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
        <MaterialReactTable
            columns={columns}
            data={roles}
            enableRowSelection
            getRowId={(row) => row._id}
            onRowSelectionChange={setRowSelection}
            state={{ rowSelection }}
        />
        <StyledButton variant="contained" color="primary" onClick={assignRolesToGroup}>
          Save
        </StyledButton>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
                {responseMessage}
            </Alert>
        </Snackbar>
    </div>
  );
};

export default AssignRoles;