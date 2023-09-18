import { Box, ButtonBase, Icon, styled } from '@mui/material';
import useSettings from 'app/hooks/useSettings';
import useAuth from 'app/hooks/useAuth';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Span } from '../Typography';

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
  },
};


const InternalLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary,
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  display: mode === 'compact' && 'none',
}));

const BulletIcon = styled('div')(({ theme }) => ({
  padding: '2px',
  marginLeft: '24px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.text.primary,
}));

const GenVerticalNav = () => {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;
  const { user } = useAuth();

  const projects = user.projects;

  const renderLevels = (data) => {
    return data.map((item, index) => {
      return (
        <InternalLink key={index}>
          <NavLink
            to='/dashboard/projects'
            state={{ id: item.id }}
            className={({ isActive }) =>
              isActive
                ? `navItemActive`
                : ``
            }
          >
            <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
              {item?.icon ? (
                <Icon className="icon" sx={{ width: 36 }}>
                  {item.icon}
                </Icon>
              ) : (
                <Fragment>
                  <BulletIcon
                    className={`nav-bullet`}
                    sx={{ display: mode === 'compact' && 'none' }}
                  />
                  <Box
                    className="nav-bullet-text"
                    sx={{
                      ml: '20px',
                      fontSize: '11px',
                      display: mode !== 'compact' && 'none',
                    }}
                  >
                    {item.iconText}
                  </Box>
                </Fragment>
              )}
              <StyledText mode={mode} className="sidenavHoverShow">
                {item.name}
              </StyledText>
              <Box mx="auto" />
            </ButtonBase>
          </NavLink>
        </InternalLink>
      );
    });
  };

  return <div className="navigation">{renderLevels(projects)}</div>;
};

export default React.memo(GenVerticalNav);
