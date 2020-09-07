import React from 'react'
import styled from 'styled-components'
import Alert from '@material-ui/lab/Alert'
import { Grid, Snackbar, CircularProgress } from '@material-ui/core'
import { useFetch } from '@hooks'

const Employees = () => {
  const { response, error, isLoading } = useFetch('employees')

  const renderEmployees = () => {
    if (isLoading) return <CircularProgress />
    return (
      <Grid container>
        {response.map((employee: any) => (
          <Grid item xs={3}>
            <CardStyled>{`${employee.first} ${employee.last}`}</CardStyled>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <ContainerStyled>
      <Grid container>
        <Grid item xs={3}>
          Filters
        </Grid>
        <Grid item xs={9}>
          {renderEmployees()}
        </Grid>
      </Grid>

      {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert elevation={6} variant="filled" severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </ContainerStyled>
  )
}

export default Employees

const ContainerStyled = styled.div`
  padding: 40px;
`

const CardStyled = styled.div`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 40px;
  margin: 10px;
`
