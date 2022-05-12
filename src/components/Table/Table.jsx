import LinkIcon from '@mui/icons-material/Link'
import { Button, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState } from 'react'
import * as api from '../../gistsApi'
import ToolTip from '../ToolTip'
import DataGrid from './DataGrid'
import styles from '../../style/table.module.css'
const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    {field: 'description', headerName: 'Description', width: 150, renderCell: (params) => (
            <ToolTip title={params.value || 'no description'}><p>{params.value}</p></ToolTip>
        )
    },
    { field: 'url', headerName: 'URL', width: 150, renderCell: (params) => (
            <Button onClick={() => window.open(params.value)}><LinkIcon/></Button>
        )
    },
    { field: 'public', headerName: 'Public', width: 150, renderCell: (params) => (
        params.value ? "true" : "false"
        )
    },

    { field: 'id', headerName: 'ID', width: 150 },
]



function Table({ sx, buttonHandler, auth, selected, onRefChange })  {
    
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    

    function deleteSelected() {
        selected.current.map(id => (
            api.deleteSelected(id, auth.token)
        ))
        setRows(
            rows.filter(row => selected.current.includes(row.id) === false)
        )
        selected.current = []
    }
    buttonHandler.current = deleteSelected



    useEffect(() => {
        async function loadGists() {
            let gists = await api.getAllGists(auth.user, auth.token)
            console.log(`gists: ${gists}`)
            let formatted = api.formatGists(gists, auth.user)
            console.log(`formatted: ${formatted}`)
            setRows(formatted)
            setLoading(false)
        }
        loadGists()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
                
                <Grid className={styles.table}>

                    {loading 
                        ?   <CircularProgress/>
                        : <DataGrid selected={selected} onRefChange={onRefChange} rowsProp={rows} columns={columns} />
                    }                    
                </Grid>
        </>
    )
}



export default Table