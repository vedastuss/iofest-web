import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTotalPrice, clearCart } from '../../redux/slices/cartSlice'
import { useSnackbar } from 'notistack'
import { createOrder, updateTableStatus } from '../../https/index.js'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { removeCustomer } from '../../redux/slices/customerSlice.js'
import Invoice from '../invoice/Invoice.jsx'


const Bill = () => {
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const customerData = useSelector((state) => state.customer);
  const { enqueueSnackbar } = useSnackbar();
  const [showInvoice, setShowInvoice] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderInfo, setOrderInfo] = React.useState(null);

  const taxRate = 10; // 10% tax
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  // Table Update Mutation
  const tableUpdateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTableStatus(id, data),
    onSuccess: (resData) => {
      console.log(resData);
      // dispatch(clearCart());
      // dispatch(removeCustomer());

      enqueueSnackbar("Order Placed!", {
        variant: "success",
      });

      // navigate("/");
    },
  });

  // Order Mutation
  const orderMutation = useMutation({
    mutationFn: (reqData) => createOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      setOrderInfo(data);  // ← Add this
      setShowInvoice(true); // ← Add this

      const tableId = typeof data.table === 'string' ? data.table : data.table._id;

      const tableData = {
        status: "Booked",
        orderId: data._id,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate({
          id: tableId,
          data: tableData
        });
      }, 1500);
    },
    onError: (error) => {
      console.error('Order placement error:', error);
      enqueueSnackbar("Failed to place order!", { variant: "error" });
    }
  });

  const handlePlaceOrder = () => {
    if (cartData.length === 0) {
      enqueueSnackbar("Cart is empty!", { variant: "warning" });
      return;
    }

    if (!customerData.customerName || !customerData.guests) {
      enqueueSnackbar("Please provide customer details!", { variant: "warning" });
      return;
    }

    if (!customerData.tableNo) {
      enqueueSnackbar("Please select a table!", { variant: "warning" });
      return;
    }

    const orderData = {
      table: customerData.tableId,
      customerDetails: {
        name: customerData.customerName,
        guests: customerData.guests,
      },
      orderStatus: "In Progress",
      bills: {
        total: parseFloat(total.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        totalWithTax: parseFloat(totalPriceWithTax.toFixed(2))
      },
      items: cartData.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price.toFixed(2))
      }))
    };

    orderMutation.mutate(orderData);
  };

  return (
    <>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Items ({cartData.length})</p>
        <h1 className='text-[#f5f5f5] text-md font-bold'>Rp. {total.toFixed(2)}</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Tax ({taxRate}%)</p>
        <h1 className='text-[#f5f5f5] text-md font-bold'>Rp. {tax.toFixed(2)}</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Total With Tax</p>
        <h1 className='text-[#f5f5f5] text-md font-bold'>Rp. {totalPriceWithTax.toFixed(2)}</h1>
      </div>

      <div className='flex items-center gap-3 px-5 mt-4'>
        <button
          className='bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold hover:bg-[#014ba3] transition-colors'>
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={cartData.length === 0 || orderMutation.isPending || tableUpdateMutation.isPending}
          className='bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold hover:bg-[#d99d00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
          {orderMutation.isPending || tableUpdateMutation.isPending ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
      {showInvoice && (
        <Invoice
          orderInfo={orderInfo}
          setShowInvoice={setShowInvoice}
          onClose={() => {
            dispatch(clearCart());
            dispatch(removeCustomer());
            navigate("/");
          }}
        />
      )}
    </>
  )
}

export default Bill