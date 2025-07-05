import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Row {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
}

interface TableState {
  rows: Row[];
  visibleColumns: string[];
  editing: { [id: number]: Partial<Row> };
}

const initialState: TableState = {
  rows: [],
  visibleColumns: ['name', 'email', 'age', 'role'],
  editing: {},
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<Row[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<Row>) => {
      state.rows.push(action.payload);
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    updateEditing: (
      state,
      action: PayloadAction<{ id: number; field: string; value: string | number }>
    ) => {
      const { id, field, value } = action.payload;
      if (!state.editing[id]) state.editing[id] = {};
      (state.editing[id] as any)[field] = value;
    },
    saveEdits: (state) => {
      for (const id in state.editing) {
        const idx = state.rows.findIndex((r) => r.id === +id);
        if (idx !== -1) {
          state.rows[idx] = { ...state.rows[idx], ...state.editing[+id] };
        }
      }
      state.editing = {};
    },
    cancelEdits: (state) => {
      state.editing = {};
    },
    setVisibleColumns: (state, action: PayloadAction<string[]>) => {
      state.visibleColumns = action.payload;
    },
  },
});

export const {
  setRows,
  addRow,
  deleteRow,
  updateEditing,
  saveEdits,
  cancelEdits,
  setVisibleColumns,
} = tableSlice.actions;

export default tableSlice.reducer;
