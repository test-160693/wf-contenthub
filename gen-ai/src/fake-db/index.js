import Mock from './mock';

import './db/auth';
import './db/projects';

Mock.onAny().passThrough();
