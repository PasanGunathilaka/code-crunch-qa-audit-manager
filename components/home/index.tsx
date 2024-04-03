"use client";
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createClient } from '@/utils/supabase/client';

function Home() {
  const [auditlist, setAuditList] = useState<any[]>([]);

  useEffect(() => {
    fetchAudits();
  }, []);

  async function fetchAudits() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('QualityAuditList').select('*');
      if (error) {
        console.error('Error fetching audit list:', error.message);
      } else {
        console.log("data",data)
        setAuditList(data || []);
      }
    } catch (error :any) {
      console.error('Error fetching audit list:', error.message);
    }
  }

  return (
    <div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditlist.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell>{audit.id}</TableCell>
                <TableCell>{audit.item_name}</TableCell>
                <TableCell>{audit.owner}</TableCell>
                <TableCell>{audit.status}</TableCell>
                <TableCell>{audit.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
