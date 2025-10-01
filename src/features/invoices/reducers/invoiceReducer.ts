import { v4 as uuidv4 } from 'uuid';
import type { ClientRequest } from '../../../types/client';
import type { InvoiceItemRequest, InvoiceItemWithKey } from '../../../types/invoiceItem';

type InvoiceData = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  client: ClientRequest;
  items: InvoiceItemWithKey[];
};

type InvoiceUIState = {
    isAddOpen: boolean;
    editingItem?: InvoiceItemWithKey;
}

type InvoiceState = {
    data: InvoiceData;
    ui: InvoiceUIState
}

type InvoiceAction =
    | { type: "UPDATE_INVOICE_FIELD"; payload: Partial<Omit<InvoiceData, "items" | "client">> }
    | { type: "OPEN_ADD_ITEM" }
    | { type: "CLOSE_ADD_ITEM" }
    | { type: "SAVE_ITEM"; payload: { item: InvoiceItemRequest, key?: string } }
    | { type: "SET_ITEMS"; payload: { items: InvoiceItemWithKey[] } }
    | { type: "EDIT_ITEM"; payload: { key: string } }
    | { type: "REMOVE_ITEM"; payload: { key: string } }
    | { type: "CLEAR_ITEMS" }
    | { type: "SET_CLIENT"; payload: { client: ClientRequest | undefined } }
    | { type: "UPDATE_CLIENT_FIELD"; payload: Partial<ClientRequest> };

export const initialInvoiceClient: ClientRequest = {
    name: '',
    nip: '',
    address: '',
    email: '',
    phone: '',
}

export const initialInvoiceState: InvoiceState = {
    data: {
        invoiceNumber: '',
        issueDate: '',
        dueDate: '',
        client: initialInvoiceClient,
        items: [],
    },
    ui: {
        isAddOpen: false,
        editingItem: undefined,
    }
}

export const invoiceReducer = (state: InvoiceState, action: InvoiceAction) => {
    switch (action.type) {
        case "UPDATE_INVOICE_FIELD":
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            };
        case "OPEN_ADD_ITEM":
            return {
                ...state,
                ui: {
                    ...state.ui,
                    editingItem: undefined,
                    isAddOpen: true,
                },
            };
        case "CLOSE_ADD_ITEM":
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isAddOpen: false
                },
            };
        case "SAVE_ITEM":
            if (action.payload.key) {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        items: state.data.items.map((i) => 
                            i.__key === action.payload.key ? { ...action.payload.item, __key: action.payload.key } : i
                        ),
                    },
                };
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    items: [...state.data.items, { ...action.payload.item, __key: uuidv4() }],
                },
            };
        case "SET_ITEMS":
            return {
                ...state,
                data: {
                    ...state.data,
                    items: action.payload.items,
                }
            }
        case "EDIT_ITEM":
            return {
                ...state,
                data: {
                    ...state.data,
                    editingItem: state.data.items.find((i) => i.__key === action.payload.key),
                    isAddOpen: true,
                }
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.filter((i) => i.__key !== action.payload.key),
                }
            };
        case "CLEAR_ITEMS":
            return {
                ...state,
                data: {
                    ...state.data,
                    items: [],
                }
            };
        case "SET_CLIENT":
            return {
                ...state,
                data: {
                    ...state.data,
                    client: action.payload.client || initialInvoiceClient,
                },
            };
        case "UPDATE_CLIENT_FIELD":
            return {
                ...state,
                data: {
                    ...state.data,
                    client: {
                        ...state.data.client,
                        ...action.payload,
                    },
                }
            };
        default:
            return state;
    }
}