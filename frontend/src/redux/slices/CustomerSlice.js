import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: "",
  customerName: "",
  guests: 0,
  tableNo: "",
  tableId: ""  // ← Add this to initial state
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { name, guests } = action.payload;
      state.orderId = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString();
      state.customerName = name;
      state.guests = guests;
    },
    
    removeCustomer: (state) => {
      state.customerName = "";
      state.guests = 0;
      state.tableNo = "";
      state.tableId = "";  // ← Add this
    },
    
    updateTable: (state, action) => {
      state.tableNo = action.payload.tableNo;
      state.tableId = action.payload.tableId;  // ← Add this line!
    }
  }
});

export const { setCustomer, removeCustomer, updateTable } = customerSlice.actions;
export default customerSlice.reducer;