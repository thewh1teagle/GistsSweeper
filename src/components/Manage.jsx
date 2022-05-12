import React, { useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Table from './Table/Table';
import styles from '../style/manage.module.css'

function Manage({ auth }) {

    const buttonHandler = React.useRef(null)
    const selected = useRef([])
    const [selectedCount, setSelectedCount] = useState(0)
    const [continueBtn, setContinueBtn] = useState(false)

    const onRefChange = (selected) => {
        setSelectedCount(selected.length)
    }

    function deleteBtn() {
        if (selectedCount === 0) return
        if (!continueBtn) setContinueBtn(true)
        else {
            buttonHandler.current()
            setContinueBtn(false)
        }
    }

    return (
        <>
            <Box className={styles.container}>
                <Button 
                    className={styles.buttons}
                    disabled={selectedCount <= 0} 
                    onClick={deleteBtn} 
                    variant='contained' 
                    color={continueBtn ? 'error' : 'primary'}
                >
                    <DeleteIcon />
                    {continueBtn ? 'Continue? ' : 'DELETE '} 
                    {selectedCount > 0 ? `(${selectedCount})` : ''}
                </Button>
                {continueBtn &&
                    <Button 
                        className={styles.button}
                        color="primary" 
                        variant='contained' 
                        onClick={() => setContinueBtn(false)}
                    >
                        Cancel
                    </Button>
                }
            </Box>
            <Table
                selected={selected} 
                onRefChange={onRefChange} 
                auth={auth} 
                buttonHandler={buttonHandler} 
            />
        </>
    )
}

export default Manage