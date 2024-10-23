import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import { Box, Button, Container, Typography } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { AgGridReact } from "ag-grid-react";

const CustomerMapping = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={6}>Auto complete here</Grid>
        <Grid
          size={6}
          container
          direction="row"
          justifyContent="flex-start"
          alignContent={"flex-end"}
        >
          <Button variant="text" size="small">
            Add new parent
          </Button>
        </Grid>

        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <Container sx={{ mt: 2 }}>
            <Typography variant="h5">Child customers</Typography>
            <div
              id="child-customers-grid-container"
              className={"ag-theme-material"}
              style={{
                height: "70vh",
                minHeight: "70vh",
                width: "100%"
              }}
            >
              <AgGridReact
                gridId="child-customers-grid"
                loading={false}
                rowData={[]}
                // columnDefs={columnDefs}
                // defaultColDef={defaultColDef}
                // rowSelection={rowSelection}
                // overlayNoRowsTemplate="No child customers to display..."
              />
            </div>
          </Container>
        </Grid>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <Container sx={{ mt: 2 }}>
            <Typography variant="h5">Orphan customers</Typography>
            <div
              id="orphan-customers-grid-container"
              className={"ag-theme-material"}
              style={{
                height: "70vh",
                minHeight: "70vh",
                width: "100%"
              }}
            >
              <AgGridReact
                gridId="orphan-customers-grid"
                // loading={!orphanCustomersLoading}
                rowData={[]}
                // columnDefs={columnDefs}
                // defaultColDef={defaultColDef}
                // rowSelection={rowSelection}
                // onRowSelected={handleRowSelected}
                // overlayNoRowsTemplate="No orphan customers to display..."
              />
            </div>
          </Container>
        </Grid>

        <Grid size={6} container justifyContent={"flex-end"}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            endIcon={<KeyboardDoubleArrowRightIcon />}
          >
            Remove
          </Button>
        </Grid>
        <Grid size={6} container justifyContent={"flex-start"}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<KeyboardDoubleArrowLeftIcon />}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerMapping;
