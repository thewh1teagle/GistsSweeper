import React, { useState } from 'react'
import { TextField, Snackbar, Button, Alert, Box } from '@mui/material'
import * as api from '../gistsApi'
import { LoadingButton } from '@mui/lab';
import styles from '../style/login.module.css'

function Login({setUser,  token, setToken, setAuthOk}) {

    const [openSnack, setOpenSnack] = useState(false)
    const [loading, setLoading] = useState(false)
    
    
    async function checkAuthButton() {   
        setLoading(true)
        const result = await api.checkAuth(token)
        setLoading(false)
        if (!result) {
            setOpenSnack(true)   
            return
        }
        setAuthOk(true)
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            checkAuthButton()
        }
    }

    return (

        <Box className={styles.container}>
            <TextField 
                className={styles.user} 
                onKeyDown={handleEnter} 
                variant='outlined' 
                onChange={e => setUser(e.target.value)} 
                placeholder='Username' 
            />
            <TextField 
                  
                className={styles.pass} 
                onKeyDown={handleEnter}  
                onChange={e => setToken(e.target.value)} 
                placeholder='Token'
            />
            <LoadingButton 
                loading={loading} 
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