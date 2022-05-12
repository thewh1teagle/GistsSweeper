import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import styles from '../style/manage.module.css';
import Table from './Table/Table';

function Manage({ token, user }) {

    const deleteBtn = React.useRef()
    const [selectedCount, setSelectedCount] = useState(0)
    const [continueBtn, setContinueBtn] = useState(false)

    const onSelectedChange = (selected) => {
        setSelectedCount(selected.length)
    }

    function deleteHandler() {
        if (!continueBtn) {
            setContinueBtn(true)
            return
        }
        deleteBtn.current()
        setContinueBtn(false)
    }

    return (
        <>
            <Box className={styles.container}>
                <Button 
                    className={styles.buttons}
                    disabled={selectedCount <= 0} 
                    onClick={deleteHandler} 
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
                onSelectedChange={onSelectedChange} 
                token={token}
                user={user} 
                deleteBtn={deleteBtn} 
            />
        </>
    )
}

export default Manage