// action types
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// action creators
export const addItem = item => ({
    type: ADD_ITEM,
    item
});

export const removeItem = itemId => ({
    type: REMOVE_ITEM,
    itemId
});

export const updateItemQuantity = (itemId, quantity) => ({
    type: UPDATE_ITEM_QUANTITY,
    itemId,
    quantity,
});
