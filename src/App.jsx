import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Manage from './components/Manage';
import Login from './components/Login'
import styles from './style/app.module.css'

function App() {

  const [auth, setAuth] = useState(
    {user: '', token: '', ok: false, wrongToken: false, loading: false}
  )

  return (
    <Grid className={styles.main}>
      <Typography className={styles.title}>
        Manage your gists
      </Typography>
      {auth.ok 
        ? <Manage auth={auth} /> 
        : <Login auth={auth} setAuth={setAuth} />
      }
    </Grid>
  )
}

export default App