import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import ManualDraggableAgGrid from "./ManualDraggableAgGrid";

describe("ManualDraggableAgGrid with rowDragManaged=false", () => {
    test("should reorder rows when handling drag and drop manually", async () => {
        // Render the grid component.
        render(<ManualDraggableAgGrid />);

        // Initially, the cells render as:
        // "Item One" (cell-1), "Item Two" (cell-2), "Item Three" (cell-3)
        const firstCell = await screen.findByTestId("cell-1");
        const secondCell = await screen.findByTestId("cell-2");

        // Simulate drag start on the first cell.
        fireEvent.dragStart(firstCell);
        // Simulate dragging over the second cell.
        fireEvent.dragOver(secondCell);

        // Create a custom dragEnd event containing additional properties.
        // Here we assign:
        //   - node.rowIndex: 0 (the index of "Item One")
        //   - overIndex: 1 (dropping on "Item Two" position)
        const dragEndEvent = createEvent.dragEnd(firstCell);
        Object.defineProperty(dragEndEvent, "overIndex", {
            value: 1,
            configurable: true
        });
        Object.defineProperty(dragEndEvent, "node", {
            value: { rowIndex: 0 },
            configurable: true
        });

        // Dispatch the custom dragEnd event.
        fireEvent(firstCell, dragEndEvent);

        // Query all the cells of the dragged column (using a regex test id).
        const cells = screen.getAllByTestId(/cell-/);
        const order = cells.map(cell => cell.textContent);

        // Expected new order:
        // "Item Two" (was originally at index 1),
        // "Item One" (moved from index 0 to index 1),
        // "Item Three" (remains in its position)
        expect(order).toEqual(["Item Two", "Item One", "Item Three"]);
    });
});
