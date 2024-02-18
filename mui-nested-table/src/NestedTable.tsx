import React, { useState } from "react";
import {
    CellSpec,
    DataRowProp,
    DataRowSpec,
    HeaderCellSpec,
    HeaderRowProp,
    NestedTableProp,
    NestedTableSpec,
    TableTitleProp,
} from "./nested-table-def";
import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const NestedTable = ({ data, specs }: NestedTableProp) => {
    if (specs.length === 0) return <></>;

    const tableSpec: NestedTableSpec = specs[0],
        tableData: readonly any[] = data[tableSpec.dataKey],
        tableCellSpecs: readonly CellSpec[] = tableSpec.cellSpecs;

    if (tableData === undefined || tableData.length === 0) return <></>;
    if (tableCellSpecs === undefined || tableCellSpecs.length === 0)
        return <></>;

    const headerCellSpec: HeaderCellSpec[] = tableCellSpecs.map(
            (cellSpec: CellSpec): HeaderCellSpec => cellSpec.headerCellSpec
        ),
        dataRowSpecs: readonly DataRowSpec[] = tableCellSpecs.map(
            (tableCellSpec) => ({
                dataKey: tableCellSpec.dataKey,
                cellSpecs: tableCellSpec.dataCellSpec,
            })
        );

    const childTableSpecs: NestedTableSpec[] = specs.slice(1, specs.length);

    return (
        <>
            <TableTitle titleText={tableSpec.title} />
            <TableContainer component={Paper}>
                <Table aria-label='collapsible table'>
                    <HeaderRow cellSpecs={headerCellSpec} />
                    <TableBody>
                        {tableData.map((data) => (
                            <DataRow
                                data={data}
                                specs={dataRowSpecs}
                                childTableSpecs={childTableSpecs}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const TableTitle = ({ titleText }: TableTitleProp) => {
    return (
        <>
            {titleText && (
                <Typography variant='overline' gutterBottom component={"div"}>
                    {titleText}
                </Typography>
            )}
        </>
    );
};

const DataRow = ({ data, specs, childTableSpecs }: DataRowProp) => {
    const [rowExpanded, setRowExpanded] = useState(false),
        hasChild: boolean = childTableSpecs.length > 0,
        childDataKey: string = hasChild ? childTableSpecs[0].dataKey : "",
        childData: any = hasChild ? { [childDataKey]: data[childDataKey] } : {};

    return (
        <>
            <TableRow>
                <TableCell>
                    {hasChild && (
                        <IconButton
                            aria-label='toggle-row'
                            size='small'
                            onClick={() => setRowExpanded(!rowExpanded)}
                        >
                            {rowExpanded ? (
                                <KeyboardArrowUpIcon fontSize='small' />
                            ) : (
                                <KeyboardArrowDownIcon fontSize='small' />
                            )}
                        </IconButton>
                    )}
                </TableCell>
                {specs.map((spec) => (
                    <TableCell {...spec.cellSpecs?.cellProps}>
                        {data[spec.dataKey]}
                    </TableCell>
                ))}
            </TableRow>
            {hasChild && (
                <TableRow>
                    <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                    >
                        <Collapse
                            in={rowExpanded}
                            timeout={"auto"}
                            unmountOnExit={true}
                        >
                            <Box sx={{ margin: 1 }}>
                                <NestedTable
                                    data={childData}
                                    specs={childTableSpecs}
                                />
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

const HeaderRow = ({ cellSpecs }: HeaderRowProp) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {cellSpecs.map((cellSpec: HeaderCellSpec) => (
                    <TableCell {...cellSpec.cellProps}>
                        {cellSpec.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default NestedTable;
