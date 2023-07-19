import React, { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import apiService from '../services/apiServices';
import { Button, styled, Snackbar, Alert } from '@mui/material';


const AssignUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState({});
  const [severity, setSeverity] = React.useState({});

  const { group } = props;

  console.log("rowSelection === "+JSON.stringify(Object.keys(rowSelection)));

  useEffect(() => {
    (async () => {
      try {
        const users_response  = await apiService.get('/api/users');
        const customRow = {};
        if(group && group.user_ids != null) {
            users_response.data.map((user) => {
                console.log("dadad ============ "+JSON.stringify(user._id));
                console.log("dadad ============ "+JSON.stringify(group.user_ids));
                if(group.user_ids.includes(user._id)) {
                    customRow[user._id] = true;
                    console.log("customRow ============ "+JSON.stringify(customRow));
                }
                return user;
            });
        }
        setRowSelection(customRow);
        setUsers(users_response.data);
        console.log("exec==="+JSON.stringify(rowSelection));
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
        accessorKey: 'firstName',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
    ],
    [],
  );

  const assignUsersToGroups = () => {
    const integerList = Object.keys(rowSelection).map((str) => parseInt(str));
    apiService.put('/api/groups/'+group._id+'/users', { user_ids: integerList })
      .then((response) => {
        setResponseMessage("Assigned Users Successfully !");
        setSeverity("success");
        setOpen(true);
      })
      .catch((error) => {
        setResponseMessage("Failed to Assign Users !");
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
            data={users}
            enableRowSelection
            getRowId={(row) => row._id}
            onRowSelectionChange={setRowSelection}
            state={{ rowSelection }}
        />
        <StyledButton variant="contained" color="primary" onClick={assignUsersToGroups}>
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

export default AssignUsers;