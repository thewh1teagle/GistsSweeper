import React, { useState } from 'react'
import { TextField, Snackbar, Button, Alert, Box } from '@mui/material'
import * as api from '../gistsApi'
import { LoadingButton } from '@mui/lab';
import styles from '../style/login.module.css'

function Login({auth, setAuth}) {

    const [openSnack, setOpenSnack] = useState(false)
    
    
    async function checkAuthButton() {    
        setAuth({ ...auth, loading: true })
        const result = await api.checkAuth(auth.user, auth.token)
        if (!result) setOpenSnack(true)
        setAuth({ ...auth, ok: result, loading: false })
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            checkAuthButton()
        }
    }

    function tokenHandler(e) {
        setAuth({ ...auth, token: e.target.value })
    }

    function userHandler(e) {
        setAuth({ ...auth, user: e.target.value })
    }

    return (

        <Box className={styles.container}>
            <TextField 
                className={styles.user} 
                onKeyDown={handleEnter} 
                variant='outlined' 
                onChange={userHandler} 
                placeholder='Username' 
            />
            <TextField 
                  
                className={styles.pass} 
                onKeyDown={handleEnter}  
                onChange={tokenHandler} 
                placeholder='Token'
            />
            <LoadingButton 
                loading={auth.loading} 
                onClick={checkAuthButton} 
                variant='contained'>
                Generate gists list
            </LoadingButton>
            <Button 
                className={styles.submit}
                target='_blank' href='https://github.com/settings/tokens' 
                variant='contained'>
                    Generate access token
            </Button>
            <Snackbar open={openSnack} onClose={() => setOpenSnack(false)} autoHideDuration={3000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Token is wrong
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Login