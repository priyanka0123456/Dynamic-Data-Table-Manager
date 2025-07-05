'use client';
import React, { useState, useRef } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow,TableContainer, Paper, IconButton, TextField, Button,TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Stack} from '@mui/material';
import { Delete, Edit, Save, Cancel, FileUpload, FileDownload } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/useTable';
import {deleteRow, updateEditing, saveEdits, cancelEdits, setRows} from '../store/tableSlice';
import { exportCSV, parseCSV } from '../utils/csvUtils';
import {DragDropContext, Droppable,Draggable} from '@hello-pangea/dnd';


const DataTable = () => {
  const dispatch = useAppDispatch();
  const { rows, visibleColumns, editing } = useAppSelector((state) => state.table);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      val?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await parseCSV(file);
      dispatch(setRows(data));
    }
  };

  const handleExport = () => {
    exportCSV(rows, visibleColumns);
  };

  const renderCell = (row: any, col: string) => {
    const isEditing = editing[row.id];
    if (isEditing) {
      const currentValue = (isEditing as any)[col] ?? row[col];
      return (
        <TextField
          variant="standard"
          value={currentValue || ''}
          onChange={(e) =>
            dispatch(updateEditing({ id: row.id, field: col, value: e.target.value }))
          }
        />
      );
    }
    return row[col];
  };

  return (
    <div>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Button variant="contained" startIcon={<FileUpload />} onClick={() => fileInputRef.current?.click()}>
          Import CSV
        </Button>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={handleExport}>
          Export CSV
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <DragDropContext
            onDragEnd={({ source, destination }) => {
              if (!destination) return;
              const updated = Array.from(visibleColumns);
              const [removed] = updated.splice(source.index, 1);
              updated.splice(destination.index, 0, removed);
              dispatch({ type: 'table/setVisibleColumns', payload: updated });
            }}
          >
           <Droppable droppableId="columns" direction="horizontal" type="column">
  {(provided) => (
    <>
      <TableHead ref={provided.innerRef} {...provided.droppableProps}>
        <TableRow>
          {visibleColumns.map((col, index) => (
            <Draggable key={col} draggableId={col} index={index}>
              {(drag) => (
                <TableCell
                  ref={drag.innerRef}
                  {...drag.draggableProps}
                  {...drag.dragHandleProps}
                >
                  {col.toUpperCase()}
                </TableCell>
              )}
            </Draggable>
          ))}
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      {provided.placeholder}
    </>
  )}
</Droppable>

          </DragDropContext>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                {visibleColumns.map((col) => (
                  <TableCell key={col}>{renderCell(row, col)}</TableCell>
                ))}
                <TableCell>
                  {editing[row.id] ? (
                    <>
                      <IconButton onClick={() => dispatch(saveEdits())}><Save /></IconButton>
                      <IconButton onClick={() => dispatch(cancelEdits())}><Cancel /></IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => dispatch(updateEditing({ id: row.id, field: '', value: '' }))}><Edit /></IconButton>
                      <IconButton onClick={() => setDeleteId(row.id)}><Delete /></IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this row?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button
            onClick={() => {
              if (deleteId !== null) dispatch(deleteRow(deleteId));
              setDeleteId(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;