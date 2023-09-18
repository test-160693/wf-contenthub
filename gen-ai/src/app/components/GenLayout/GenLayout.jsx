import { GenSuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { GenLayouts } from './index';

const GenLayout = (props) => {
  const { settings } = useSettings();
  const Layout = GenLayouts[settings.activeLayout];

  return (
    <GenSuspense>
      <Layout {...props} />
    </GenSuspense>
  );
};

export default GenLayout;
