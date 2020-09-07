import React from 'react'
import styled from 'styled-components'

const Home = () => (
  <ContainerStyled>
    <h1>Welcome to Glide App!</h1>
    <span>Please select one of the menu items</span>
  </ContainerStyled>
)

export default Home

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
`
