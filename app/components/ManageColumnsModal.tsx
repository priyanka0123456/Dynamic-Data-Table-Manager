'use client';
import React, { useState } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControlLabel, Checkbox, Button} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useTable';
import { setVisibleColumns } from '../store/tableSlice';

const allColumns = ['name', 'email', 'age', 'role', 'department', 'location'];

const ManageColumnsModal = () => {
  const dispatch = useAppDispatch();
  const { visibleColumns } = useAppSelector((state) => state.table);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(visibleColumns);

  const toggleColumn = (col: string) => {
    setSelected((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleSave = () => {
    dispatch(setVisibleColumns(selected));
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Manage Columns
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          <FormGroup>
            {allColumns.map((col) => (
              <FormControlLabel
                key={col}
                control={
                  <Checkbox
                    checked={selected.includes(col)}
                    onChange={() => toggleColumn(col)}
                  />
                }
                label={col.toUpperCase()}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageColumnsModal;

