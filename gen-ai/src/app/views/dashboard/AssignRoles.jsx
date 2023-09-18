import React, { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, styled, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const AssignRoles = (props) => {
  const [roles, setRoles] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = React.useState(false);

  const { group } = props;

  console.log("rowSelection === "+JSON.stringify(Object.keys(rowSelection)));

  useEffect(() => {
    (async () => {
      try {
        const roles_response  = await axios.get('/api/roles');
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
    </div>
  );
};

export default AssignRoles;