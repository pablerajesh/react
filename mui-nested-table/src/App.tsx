import React from "react";
import CollapsibleTable from "./CollapsibleTable";
import NestedTable from "./NestedTable";
import { Box, Container } from "@mui/material";
import { nestedTableData, nestedTableSpecs } from "./mock-data";

function App() {
    return (
        <>
            <h3>Collapsible table</h3>
            <Container maxWidth='xl'>
                <Box>
                    <CollapsibleTable />
                </Box>
            </Container>

            <h3>Nested table</h3>
            <Container maxWidth='xl'>
                <NestedTable data={nestedTableData} specs={nestedTableSpecs} />
            </Container>
        </>
    );
}

export default App;
