'use client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRows } from './store/tableSlice';
import DataTable from './components/DataTable';
import ManageColumnsModal from './components/ManageColumnsModal';

const sampleData = [
  {
    id: 1,
    name: 'Priyanka kumari',
    email: 'priyankarar4595@gmail.com',
    age: 22,
    role: 'Developer',
    department: 'Engineering',
    location: 'Jaipur'
  },
  {
    id: 2,
    name: 'Priya',
    email: 'Priya@gmail.com',
    age: 25,
    role: 'Designer',
    department: 'UI/UX',
    location: 'hyderabad'
  },
  {
    id: 3,
    name: 'Manisha',
    email: 'manisha@gmail.com',
    age: 30,
    role: 'Manager',
    department: 'Operations',
    location: 'Lucknow'
  },
   {
    id: 4,
    name: 'Amit Verma',
    email: 'amitv.dev@gmail.com',
    age: 28,
    role: 'Frontend Engineer',
    department: 'Engineering',
    location: 'Delhi'
  },
  {
    id: 5,
    name: 'Sneha Singh',
    email: 'sneha.singh@designhub.io',
    age: 26,
    role: 'Product Designer',
    department: 'Design',
    location: 'Mumbai'
  },
  {
    id: 6,
    name: 'Rahul Sharma',
    email: 'rahul.s@company.com',
    age: 32,
    role: 'Backend Developer',
    department: 'Engineering',
    location: 'Bangalore'
  },
  {
    id: 7,
    name: 'Ankita Mehta',
    email: 'ankita.mehta@teamtools.in',
    age: 29,
    role: 'HR Executive',
    department: 'Human Resources',
    location: 'Pune'
  },
  {
    id: 8,
    name: 'Rohan Jain',
    email: 'rohan.jain@ops.co',
    age: 34,
    role: 'Operations Lead',
    department: 'Operations',
    location: 'Chennai'
  },
  {
    id: 9,
    name: 'Kavita Das',
    email: 'kavita.d@marketingbuzz.in',
    age: 27,
    role: 'Marketing Strategist',
    department: 'Marketing',
    location: 'Ahmedabad'
  },
  {
    id: 10,
    name: 'Nikhil Agarwal',
    email: 'nikhil.ag@qa.io',
    age: 31,
    role: 'QA Engineer',
    department: 'Quality Assurance',
    location: 'Noida'
  },
  {
    id: 9,
    name: 'Kavita Das',
    email: 'kavita.d@marketingbuzz.in',
    age: 27,
    role: 'Marketing Strategist',
    department: 'Marketing',
    location: 'Ahmedabad'
  },
  {
    id: 10,
    name: 'Nikhil Agarwal',
    email: 'nikhil.ag@qa.io',
    age: 31,
    role: 'QA Engineer',
    department: 'Quality Assurance',
    location: 'Noida'
  }
];

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRows(sampleData));
  }, [dispatch]);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dynamic Data Table Manager</h1>
      <div style={{ marginBottom: '1rem' }}>
        <ManageColumnsModal />
      </div>
      <DataTable />
    </main>
  );
}

