import { Card, Grid, styled, Fab, Icon, useTheme } from '@mui/material';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';
import { Breadcrumb, OptionsCard, SimpleCard } from 'app/components';
import { NavLink } from 'react-router-dom';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const fabStyle = {
  marginRight: '16px',
};

const Analytics = () => {

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12} align='right'>
              <NavLink to="/material/buttons">
                <Fab size="small" color="primary" aria-label="Add" className="button" 
                  sx={{ marginRight: 2 }}>
                  <Icon>add</Icon>
                </Fab>
              </NavLink>
              <Fab size="small" color="secondary" aria-label="Edit" className="button" sx={{ marginRight: 2 }}>
                <Icon>edit_icon</Icon>
              </Fab>
              <Fab size="small" color="warning" aria-label="Delete" className="button">
                <Icon>delete</Icon>
              </Fab>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <RowCards />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
