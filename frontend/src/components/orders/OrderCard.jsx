import React from 'react'
import { FaCheckDouble } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'
import { formatDateAndTime, getAvatarName } from '../../utils/index';

const OrderCard = ({ key, order }) => {
  console.log(order);
  return (
    <div className='w-[400px] bg-[#262626] p-4 rounded-lg mb-4'>
      <div className='flex items-center gap-5 mb-3'>
        <button
          className={`${order.orderStatus === "Ready" ? "bg-green-600" : "bg-yellow-600"} 
        p-3 text-xl font-bold rounded-lg`}>
          {getAvatarName(order.customerDetails.name)}
        </button>

        <div className='flex items-center justify-between w-[100%]'>
          <div className='flex flex-col items-start gap-1'>
            <h1 className='⬜ text-[#f5f5f5] text-2xl font-semibold tracking-wide'>
              {order.customerDetails.name}
            </h1>
            <p className="text-[#ababab] text-sm">Table: {order.table.tableNo}</p>
          </div>

          <div className='flex flex-col items-start gap-2'>
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mr-2" /> {order.orderStatus}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-[#ababab]">
        <p>{formatDateAndTime(order.createdAt)}</p>
        <p>{order.items.length}</p>
      </div>
      <hr className="w-full mt-4 border-t-1 border-[#f5f5f5]" />
      <div className='flex justify-between items-center mt-4'>
        <h1 className="text-[#f5f5f5] font-semibold text-lg mt-4 mb-2">Total</h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">Rp. {order.bills.totalWithTax}</p>
      </div>
    </div>
  )
}

export default OrderCard