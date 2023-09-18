import React from 'react';
import {
    Card,
    Box,
    Grid,
    Fab,
    Icon, IconButton, styled, Tooltip
  } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Small } from 'app/components/Typography';
import { Fragment } from 'react';
import { getTimeDifference } from 'app/utils/utils.js';


const Templates = ({ templates}) => {
  const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
  }));
  
  const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': { color: theme.palette.text.secondary },
    '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
  }));
  
  const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.palette.primary.main,
  }));

  return (
    <Fragment>
      <ContentBox>
        <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12} align='right' sx={{ marginRight: '100px' }}>
                <NavLink to="/material/buttons">
                    <Fab size="small" color="primary" aria-label="Add" className="button" 
                    sx={{ marginRight: 2 }}>
                    <Icon>add</Icon>
                    </Fab>
                </NavLink>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2} sx={{ m: '8px' }} style={{width: "90%"}}>
                    {templates.map((template, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <StyledCard elevation={6}>
                                <ContentBox>
                                    <Box ml="12px">
                                        <Heading>{template.title}</Heading>
                                        <Small>{template.model}</Small>
                                    </Box>
                                </ContentBox>
                                <Tooltip title="View Details" placement="top">
                                <IconButton>
                                    <Icon>arrow_right_alt</Icon>
                                </IconButton>
                                </Tooltip>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Templates;