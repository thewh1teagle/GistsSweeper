import LinkIcon from '@mui/icons-material/Link'
import { Button, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState, useRef } from 'react'
import * as api from '../../gistsApi'
import ToolTip from '../ToolTip'
import DataGrid from './DataGrid'
import styles from '../../style/table.module.css'


const columns = [
    {field: 'name', headerName: 'Name', width: 150 },
    {field: 'description', headerName: 'Description', width: 150, renderCell: (params) => (
            <ToolTip title={params.value || 'no description'}>
                    <p>{params.value}</p>
            </ToolTip>
    )},
    {field: 'url', headerName: 'URL', width: 150, renderCell: (params) => (
            <Button 
                onClick={() => window.open(params.value)}>
                    <LinkIcon/>
            </Button>
    )},
    {field: 'public', headerName: 'Public', width: 150, renderCell: (params) => (
        params.value ? "true" : "false"
    )},
    {field: 'id', headerName: 'ID', width: 150 }
]



function Table({ sx, deleteBtn, token, user, onSelectedChange })  {
    const selected = useRef([])
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    

    function deleteSelected() {
        selected.current.map(id => (api.deleteSelected(id, token)))
        setRows(rows.filter(row => selected.current.includes(row.id) === false))
        selected.current = []
    }
    deleteBtn.current = deleteSelected



    useEffect(() => {
        (async () => {
            let gists = await api.getGists(user, token)
            setRows(gists)
            setLoading(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
                
                <Grid className={styles.table}>
                    {loading 
                        ?   <CircularProgress/>
                        :   <DataGrid 
                                selected={selected}
                                onSelectedChange={onSelectedChange} 
                                rowsProp={rows} columns={columns} 
                            />
                    }                    
                </Grid>
        </>
    )
}



export default Table