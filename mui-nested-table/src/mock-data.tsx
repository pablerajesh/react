import { CellSpec, NestedTableProp, NestedTableSpec } from "./nested-table-def";

export interface FoodInventory {
    readonly id: number;
    readonly asOfData: string;
    readonly preparedBy: string;
    readonly foods: readonly Food[];
}

export interface Food {
    name: string;
    calorie: number;
    fat: number;
    carb: number;
    protein: number;
    purchaseHistory: PurchaseHistory[];
}

export interface PurchaseHistory {
    date: string;
    customerId: string;
    amount: number;
    price: number;
}

const desserts: readonly Food[] = [
    {
        name: "Frozen yoghurt",
        calorie: 159,
        fat: 6.0,
        carb: 24,
        protein: 4.0,
        purchaseHistory: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
                price: 3.99,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
                price: 4.99,
            },
        ],
    },
    {
        name: "Ice cream sandwich",
        calorie: 237,
        fat: 9.0,
        carb: 37,
        protein: 4.3,
        purchaseHistory: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
                price: 3.99,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
                price: 4.99,
            },
        ],
    },
    {
        name: "Eclair",
        calorie: 262,
        fat: 16.0,
        carb: 34,
        protein: 6,
        purchaseHistory: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
                price: 3.99,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
                price: 4.99,
            },
        ],
    },
    {
        name: "Cupcake",
        calorie: 305,
        fat: 3.7,
        carb: 67,
        protein: 4.3,
        purchaseHistory: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
                price: 3.99,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
                price: 4.99,
            },
        ],
    },
    {
        name: "Gingerbread",
        calorie: 356,
        fat: 16.0,
        carb: 49,
        protein: 3.9,
        purchaseHistory: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
                price: 3.99,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
                price: 4.99,
            },
        ],
    },
];

const foodInventories: readonly FoodInventory[] = [
    {
        id: 1,
        asOfData: "2024-01-05",
        preparedBy: "Pable, Rajesh S.",
        foods: desserts,
    },
];

export const nestedTableData: any = {
    items: foodInventories,
};

const inventoryCellSpecs: readonly CellSpec[] = [
    {
        dataKey: "id",
        headerCellSpec: {
            label: "INVENTORY ID",
            cellProps: { align: "right" },
        },
        dataCellSpec: {
            cellProps: { align: "right" },
        },
    },
    {
        dataKey: "asOfData",
        headerCellSpec: {
            label: "DATE PREPARED ON",
            cellProps: { align: "right" },
        },
        dataCellSpec: {
            cellProps: { align: "right" },
        },
    },
    {
        dataKey: "preparedBy",
        headerCellSpec: {
            label: "PREPARED BY",
            cellProps: { align: "left" },
        },
        dataCellSpec: {
            cellProps: { align: "left" },
        },
    },
];

const dessertCellSpecs: readonly CellSpec[] = [
    {
        dataKey: "name",
        headerCellSpec: {
            label: "Dessert (100g serving)",
        },
    },
    {
        dataKey: "calorie",
        headerCellSpec: {
            label: "Calories",
        },
    },
    {
        dataKey: "fat",
        headerCellSpec: {
            label: "Fat (g)",
        },
    },
    {
        dataKey: "carb",
        headerCellSpec: {
            label: "Carbs (g)",
        },
    },
    {
        dataKey: "protein",
        headerCellSpec: {
            label: "Protein (g)",
        },
    },
];

const purchaseHistoryCellSpecs: readonly CellSpec[] = [
    {
        dataKey: "date",
        headerCellSpec: {
            label: "Purchased On Date",
        },
    },
    {
        dataKey: "customerId",
        headerCellSpec: {
            label: "Customer Id",
        },
    },
    {
        dataKey: "amount",
        headerCellSpec: {
            label: "Amount/Quantity",
        },
    },
    {
        dataKey: "price",
        headerCellSpec: {
            label: "Price (Rs.)",
        },
    },
];

export const nestedTableSpecs: readonly NestedTableSpec[] = [
    {
        dataKey: "items",
        cellSpecs: inventoryCellSpecs,
        title: undefined,
    },
    {
        dataKey: "foods",
        cellSpecs: dessertCellSpecs,
        title: "Desserts",
    },
    {
        dataKey: "purchaseHistory",
        cellSpecs: purchaseHistoryCellSpecs,
        title: "Purchase History",
    },
];

export const nestedTableProp: NestedTableProp = {
    data: nestedTableData,
    specs: nestedTableSpecs,
};
