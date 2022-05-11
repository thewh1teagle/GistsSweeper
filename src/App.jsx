import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Table from './components/Table/Table';
import { checkAuth } from './gistsApi';

function App() {
  const selected = useRef([])
  const [openSnack, setOpenSnack] = useState(false)
  const buttonHandler = React.useRef(null)
  const [auth, setAuth] = useState({ user: '', token: '', ok: false, wrongToken: false, loading: false })
  const [selectedCount, setSelectedCount] = useState(0)

  const [continueBtn, setContinueBtn] = useState(false)

  const onRefChange = useCallback(selected => {
    setSelectedCount(selected.length)
  })

  async function checkAuthButton() {
    setAuth({ ...auth, loading: true })
    const result = await checkAuth(auth.user, auth.token)
    if (!result) setOpenSnack(true)
    setAuth({ ...auth, ok: result, loading: false })

  }


  function handleEnter(e) {
    if (e.key === 'Enter') {
      checkAuthButton()
    }
  }

  function deleteBtn() {
    if (!continueBtn) setContinueBtn(true)
    else {
      alert('deleting...')
      buttonHandler.current()
      setContinueBtn(false)
    }
  }





  return (
    <>


      <Grid sx={{ background: '#0fbfa8', minHeight: '100vh' }}>
        <Typography
          textAlign="center"
          color="white"
          fontSize="2.5em"
          paddingBottom="0.5em"
          paddingTop="0.5em"
          fontWeight="bold"
        >
          Manage your gists
        </Typography>
        {
          auth.ok
            ?
            <>
              <Box sx={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <Button onClick={() => deleteBtn()} variant='contained'
                  color={continueBtn ? 'error' : 'primary'}
                >
                  <DeleteIcon />
                  {continueBtn ? 'Continue?' :'DELETE'} {selectedCount > 0 ? ` (${selectedCount})` : null}
                </Button>
              </Box>
              <Table selected={selected} onRefChange={onRefChange} auth={auth} sx={{ minHeight: '85vh', width: '80%', backgroundColor: '#fafafa', margin: 'auto' }} buttonHandler={buttonHandler} />
            </>
      :
      <>
        <Box
          sx={{ gap: '10px', padding: '25px', borderRadius: '25px', display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '40vw', margin: 'auto' }}>
          <TextField onKeyDown={handleEnter} variant='outlined' sx={{ width: '50%', borderRadius: '13px', backgroundColor: 'white' }} onChange={(e) => setAuth({ ...auth, user: e.target.value })} placeholder='Username'></TextField>
          <TextField onKeyDown={handleEnter} sx={{ width: '50%', borderRadius: '13px', backgroundColor: 'white' }} onChange={(e) => setAuth({ ...auth, token: e.target.value })} placeholder='Token'></TextField>
          <LoadingButton loading={auth.loading} onClick={checkAuthButton} variant='contained'>Generate gists list</LoadingButton>
          <Button sx={{ background: '#e0e0e0', color: '#68645d', '&:hover': { color: 'black', background: '#e0e0e0' } }} target='_blank' href='https://github.com/settings/tokens' onClick={checkAuthButton} variant='contained'>Generate access token</Button>
          <Snackbar open={openSnack} onClose={() => setOpenSnack(false)} autoHideDuration={3000}>
            <Alert severity="error" sx={{ width: '100%' }}>
              token is wrong
            </Alert>
          </Snackbar>
        </Box>
      </>
        }



    </Grid>
    </>
  )
}

export default App