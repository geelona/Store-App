import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartSlice {
    items: number[][];
    amountOfNewItems: number;
}

const initialState: CartSlice = {
    items: [],
    amountOfNewItems: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Array<any>>) => {
            const id = action.payload[0];
            const item = state.items.find((item) => item[0] === id);
            if (item) {
                item[1]++;
            } else {
                state.items.push([
                    id,
                    1,
                    action.payload[1],
                    action.payload[2],
                    action.payload[3],
                    action.payload[4],
                ]);
            }
        },
        addNewItem: (state) => {
            state.amountOfNewItems++;
        },
        resetNewItems: (state) => {
            state.amountOfNewItems = 0;
        },
        addItemAmount: (state, action: PayloadAction<{ itemId: number }>) => {
            const item = state.items.find(
                (item) => item[0] === action.payload.itemId
            );
            if (item) {
                item[1]++;
            }
        },
        subtractItemAmount: (
            state,
            action: PayloadAction<{ itemId: number }>
        ) => {
            const item = state.items.find(
                (item) => item[0] === action.payload.itemId
            );
            if (item) {
                if (item[1] === 1) {
                    state.items = state.items.filter(
                        (item) => item[0] !== action.payload.itemId
                    );
                } else {
                    item[1]--;
                }
            }
        },
        deleteItem: (state, action: PayloadAction<{ itemId: number }>) => {
            state.items = state.items.filter(
                (item) => item[0] !== action.payload.itemId
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addItem,
    addNewItem,
    resetNewItems,
    addItemAmount,
    subtractItemAmount,
    deleteItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
