import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";

import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", editable: true, headerName: "Column 2", width: 150 },
];

export default function Material_table() {
  const [openUpdateDialog, setOpenUpdatedDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [edited, setEdited] = useState(null);
  const [updatedRow, setUpdatedRow] = useState(null);
  const [confirmChange, setConfirmChange] = useState(null);

  const showDialog = (params) => {
    setOpenConfirmDialog(true);
    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title"> {params.row.id}</DialogTitle>
        <DialogContent>
          <Alert severity="error">{params.row.id} want change?</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleCellEditStop = (params) => {
    console.log(params);
    setUpdatedRow(params.row);
    setOpenConfirmDialog(true);
    edited && setOpenUpdatedDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenUpdatedDialog(false);
    setEdited(null);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        onCellEditStop={handleCellEditStop}
        onProcessRowUpdateError={(params) => console.error(params)}
      />
      {updatedRow && (
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> {updatedRow.id}</DialogTitle>
          <DialogContent>
            <Alert severity="error">{updatedRow.id} has been updated</Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
