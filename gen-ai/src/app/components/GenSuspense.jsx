import { Suspense } from 'react';
import { GenLoading } from 'app/components';

const GenSuspense = ({ children }) => {
  return <Suspense fallback={<GenLoading />}>{children}</Suspense>;
};

export default GenSuspense;
