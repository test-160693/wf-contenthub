import { Box } from '@mui/material';
import { ECMProgressBar, SimpleCard } from 'app/components';
import { Small } from 'app/components/Typography';

const Campaigns = () => {
  return (
    <Box>
      <SimpleCard title="Campaigns">
        <Small color="text.secondary">Today</Small>
        <ECMProgressBar value={75} color="primary" text="Google (102k)" />
        <ECMProgressBar value={45} color="secondary" text="Twitter (40k)" />
        <ECMProgressBar value={75} color="primary" text="Tensor (80k)" />

        <Small color="text.secondary" display="block" pt={4}>
          Yesterday
        </Small>
        <ECMProgressBar value={75} color="primary" text="Google (102k)" />
        <ECMProgressBar value={45} color="secondary" text="Twitter (40k)" />
        <ECMProgressBar value={75} color="primary" text="Tensor (80k)" />

        <Small color="text.secondary" display="block" pt={4}>
          Yesterday
        </Small>
        <ECMProgressBar value={75} color="primary" text="Google (102k)" />
        <ECMProgressBar value={45} color="secondary" text="Twitter (40k)" />
        <ECMProgressBar value={75} color="primary" text="Tensor (80k)" />
      </SimpleCard>
    </Box>
  );
};

export default Campaigns;
