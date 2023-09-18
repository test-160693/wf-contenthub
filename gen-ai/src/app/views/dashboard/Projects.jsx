import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Templates from './Tempaltes';
import Members from './Members';
import {useLocation} from 'react-router-dom';

const Projects = () => {
  let location = useLocation();
  console.log(location.state.id);
  const projectId = location.state.id;
  const [templates, setTemplates] = useState([]);
  const [members, setMembers] = useState([]);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProjectById = async (id) => {
    try {
      const res = await axios.post('/api/templates', { id: id });
      console.log("data === "+JSON.stringify(res));
      setTemplates(res.data.templates);
      setMembers(res.data.users);
      console.log(templates)
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("Project Id :: == "+projectId);
    getProjectById(projectId);
  }, []);

  return (
    <TabContext value={value}
        textColor="secondary"
        indicatorColor="secondary"
    >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Templates" value="1" />
                <Tab label="Members" value="2" />
                <Tab label="Settings" value="3" />
            </TabList>
        </Box>
            <TabPanel value="1">
                <Templates templates = {templates}></Templates>
            </TabPanel>
            <TabPanel value="2">
                <Members members = {members}></Members>
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
    </TabContext>
  );
};

export default Projects;