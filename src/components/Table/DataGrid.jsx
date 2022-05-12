import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import QuickSearchToolbar from './SearchToolBar';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default function QuickFilteringGrid({columns, rowsProp, selected, onSelectedChange}) {

  const data = rowsProp
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(rowsProp)


  useEffect(() => {
    setRows(rowsProp)
  }, [rowsProp])

  const requestSearch = useCallback(searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.filter((row) => (
      Object.entries(row).some(([key, value]) => (
        searchRegex.test(value.toString())
      ))
    ))
    setRows(filteredRows);
  }, [data])

  return (
    <DataGrid sx={{width: '100%', height: '100%'}} autoHeight={true}
      disableSelectionOnClick={true}
      rowsPerPageOptions={[10]}
      pageSize={10}
      checkboxSelection={true}
      components={{ Toolbar: QuickSearchToolbar }}
      rows={rows}
      columns={columns}
      onSelectionModelChange={selection => {
        selected.current = selection
        onSelectedChange(selection)
      }}
      componentsProps={{
        toolbar: {
          value: searchText,
          onChange: (event) => requestSearch(event.target.value),
          clearSearch: () => requestSearch(''),
        },
      }}
    />
  )
}