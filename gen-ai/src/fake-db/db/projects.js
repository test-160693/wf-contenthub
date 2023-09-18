import Mock from '../mock';
import shortId from 'shortid';

const ProjectsDB = {
  list: [
    {
      projectId : 1,
      templates : [
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        },
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        },
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        },
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        },
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        },
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        },
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        },
        {
            id: shortId.generate(),
            timestamp: 1570702802573,
            title: 'New message from Devid',
            type: 'function',
            model: 'gpt'
        }
      ],
      users: [
        {
            id: 1,
            name: 'Krishna Sabbu',
            role: 'Admin'
        },
        {
            id: 2,
            name: 'Bindu',
            role: 'User'
        },
        {
            id: 3,
            name: 'Ramya',
            role: 'Super Admin'
        }
      ]
    },
    {
        projectId : 2,
        templates : [
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            },
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            },
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            },
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            },
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            },
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            },
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            },
            {
                id: shortId.generate(),
                timestamp: 1570702802573,
                title: 'New message from Devid',
                type: 'function',
                model: 'gpt'
            }
          ],
          users: [
            {
                id: 1,
                name: 'Krishna Sabbu',
                role: 'Admin'
            },
            {
                id: 1,
                name: 'Bindu',
                role: 'User'
            },
            {
                id: 1,
                name: 'Ramya',
                role: 'Super Admin'
            }
          ]
      }
  ]
};

const RolesDB = {
    list : [
        {
            id: 1,
            name: 'Admin'
        },
        {
            id: 2,
            name: 'User'
        },
        {
            id: 3,
            name: 'Super Admin'
        }
    ]
};

Mock.onPost('/api/templates').reply((config) => {
  let { id } = JSON.parse(config.data);
  console.log(config.data);
  const response = ProjectsDB.list.filter((project) => project.projectId === id);
  console.log(response[0].list);
  return [200, response[0]];
});

Mock.onGet('/api/roles').reply(() => {
    console.log(RolesDB.list);
    return [200, RolesDB.list];
  });

Mock.onPost('/api/project/add').reply(() => {
  const response = ProjectsDB.list;
  return [200, response];
});

Mock.onPost('/api/project/delete').reply((config) => {
  let { id } = JSON.parse(config.data);
  console.log(config.data);

  const response = ProjectsDB.list.filter((project) => project.id !== id);
  ProjectsDB.list = [...response];
  return [200, response];
});

Mock.onPost('/api/project/delete-all').reply(() => {
    ProjectsDB.list = [];
  const response = ProjectsDB.list;
  return [200, response];
});
