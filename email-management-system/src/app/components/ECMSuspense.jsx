import { Suspense } from 'react';
import { ECMLoading } from 'app/components';

const ECMSuspense = ({ children }) => {
  return <Suspense fallback={<ECMLoading />}>{children}</Suspense>;
};

export default ECMSuspense;
