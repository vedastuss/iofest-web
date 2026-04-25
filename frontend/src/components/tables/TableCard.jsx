import React from "react";
import { useNavigate } from "react-router-dom";
import { getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";

const TableCard = ({ tableKey, name, status, initials, seats, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (name, tableId) => {
    dispatch(updateTable({
      tableNo: name,
      tableId: tableId
    }));
    navigate('/menu');
  };

  return (
    <div onClick={() => handleClick(name, id)}
      className="w-[300px] hover:bg-[#2c2e2c] bg-[#262626] p-4 cursor-pointer rounded-lg shadow-md transition-all">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">Table {name}</h1>
        <p className={`${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-yellow-500"}`}>
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center mt-5 mb-8">
        <h1
          className="text-white rounded-full p-5 text-xl"
          style={{ backgroundColor: status === "Available" ? "#1f1f1f" : getBgColor() }}
        >
          {initials}
        </h1>
      </div>

      <p className="text-[#ababab] text-xs">
        Seats: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;