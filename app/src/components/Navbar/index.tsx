import React from 'react'
import { AppBar, Toolbar, Grid } from '@material-ui/core'
import styled from 'styled-components'
import history from '@utils/history'

const Navbar = () => {
  const navigate = (route) => history.push(route)
  return (
    <AppBar position="static">
      <Grid container direction="row" alignItems="center">
        <Grid item xs={9}>
          <Toolbar>
            <TitleStyled onClick={() => navigate('/')}>Glide</TitleStyled>
          </Toolbar>
        </Grid>
        <Grid item xs={3}>
          <MenuItemStyled onClick={() => navigate('/employees')}>Employees</MenuItemStyled>
          <MenuItemStyled onClick={() => navigate('/departments')}>Departments</MenuItemStyled>
          <MenuItemStyled onClick={() => navigate('/offices')}>Offices</MenuItemStyled>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Navbar

const MenuItemStyled = styled.a`
  padding: 0px 20px;
  text-decoration: none;
  color: white;
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    transition: 0.2s;
  }
`

const TitleStyled = styled.a`
  font-size: 32px;
`
