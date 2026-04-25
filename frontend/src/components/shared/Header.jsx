import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";


const Header = () => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth")
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate();
  }
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-gray-900">
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <h1 className="ml-4 text-3xl font-semibold text-gray-100">Salor</h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2">
        <input
          id="search"
          name="search"
          placeholder="Search"
          className="bg-neutral-800 text-gray-100 px-2 py-1 rounded-md pr-8"
          type="text"
          autoComplete="off"
          aria-label="Search"
        />
        <FaSearch className="text-gray-100" />
      </div>
      {/* LOGGED USER DETAILS */}
      <div className="flex items-center gap-4">{
        userData.role === 'Admin' && (
          <div onClick={() => navigate("/dashboard")} className="bg-neutral-800 rounded-[15px] p-3 cursor-pointer">
            <MdDashboard className="text-gray-100 text-xl" />
          </div>
        )
      }

        <div className="bg-neutral-800 rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-gray-100 text-xl" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-gray-100 text-xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-xl text-gray-100 font-semibold">{userData.name || "N/A"}</h1>
            <p className="text-sm text-gray-400 font-medium">{userData.role || "N/A"}</p>
          </div>
          <IoLogOut onClick={handleLogout} className="text-[#5f5f5]" size={40} />
        </div>
      </div>
    </header>
  );
};

export default Header;