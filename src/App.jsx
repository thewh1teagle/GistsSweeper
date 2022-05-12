import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Manage from './components/Manage';
import Login from './components/Login'
import styles from './style/app.module.css'

function App() {

  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  const [authOk, setAuthOk] = useState(false)


  return (
    <Grid className={styles.main}>
      <Typography className={styles.title}>
        Manage your gists
      </Typography>
      {authOk 
        ? <Manage user={user} token={token}  /> 
        : <Login token={token} setToken={setToken} setAuthOk={setAuthOk} user={user} setUser={setUser}  />
      }
    </Grid>
  )
}

export default App