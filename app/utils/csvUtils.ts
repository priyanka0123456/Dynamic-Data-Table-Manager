import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Row } from '../store/tableSlice';

export const parseCSV = (file: File): Promise<Row[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: reject,
    });
  });
};

export const exportCSV = (rows: Row[], columns: string[]) => {
  const data = rows.map((row) => {
    const filtered: Record<string, any> = {};
    columns.forEach((col) => {
      const key = col as keyof Row;
      filtered[col] = row[key];
    });
    return filtered;
  });

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'table-export.csv');
};
