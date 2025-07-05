'use client';
import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableBody, TableCell, TableRow,
  TableContainer, Paper, IconButton, TextField, Button
} from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/useTable';
import {
  deleteRow, updateEditing, saveEdits, cancelEdits
} from '../store/tableSlice';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Row } from '../store/tableSlice';

const DataTable = () => {
  const dispatch = useAppDispatch();
  const { rows, visibleColumns, editing } = useAppSelector((state) => state.table);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      val?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updated = Array.from(visibleColumns);
    const [removed] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, removed);
    dispatch({ type: 'table/setVisibleColumns', payload: updated });
  };

  const renderCell = (row: Row, col: keyof Row) => {
    const isEditing = editing[row.id];
    if (isEditing) {
      return (
        <TextField
          variant="standard"
          value={(isEditing[col] ?? row[col]) || ''}
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
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper}>
        <Table>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns" direction="horizontal" type="column">
              {(provided) => (
                <TableHead ref={provided.innerRef} {...provided.droppableProps as any}>
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
                  {provided.placeholder}
                </TableHead>
              )}
            </Droppable>
          </DragDropContext>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                {visibleColumns.map((col) => (
                  <TableCell key={col}>{renderCell(row, col as keyof Row)}</TableCell>
                ))}
                <TableCell>
                  {editing[row.id] ? (
                    <>
                      <IconButton onClick={() => dispatch(saveEdits())}>
                        <Save />
                      </IconButton>
                      <IconButton onClick={() => dispatch(cancelEdits())}>
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => dispatch(updateEditing({ id: row.id, field: '', value: '' }))}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => dispatch(deleteRow(row.id))}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
