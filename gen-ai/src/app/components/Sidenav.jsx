import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material';
import { GenVerticalNav } from 'app/components';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative'
}));


const Sidenav = ({ children }) => {
  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <GenVerticalNav />
      </StyledScrollBar>
    </Fragment>
  );
};

export default Sidenav;
