import { ECMSuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { ECMLayouts } from './index';

const ECMLayout = (props) => {
  const { settings } = useSettings();
  const Layout = ECMLayouts[settings.activeLayout];

  return (
    <ECMSuspense>
      <Layout {...props} />
    </ECMSuspense>
  );
};

export default ECMLayout;
