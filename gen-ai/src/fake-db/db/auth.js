import Mock from '../mock';

const userList = [
  {
    id: 1,
    role: 'SA',
    name: 'Krishna Sabbu',
    username: 'ksabbu',
    email: 'ksabbu@gmail.com',
    avatar: '/assets/images/sabbu.jpg',
    age: 25,
    projects: [
      {
        id : 1,
        name : 'ANG',
        icon: 'dashboard',
        iconText: 'A'
      },
      {
        id : 2,
        name : 'Fargo',
        icon: 'dashboard',
        iconText: 'F'
      }
    ]
  }
];


Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    const { email } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (!user) return [400, { message: 'Invalid email or password' }];

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onPost('/api/auth/register').reply((config) => {
  try {
    const { email, username } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (user) return [400, { message: 'User already exists!' }];

    const newUser = {
      id: 2,
      role: 'GUEST',
      name: 'Unknown',
      age: 25,
      email: email,
      username: username,
      avatar: '/assets/images/face-6.jpg'
    };

    userList.push(newUser);

    const payload = { user: { ...newUser } };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onGet('/api/auth/profile').reply((config) => {
  try {
    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
