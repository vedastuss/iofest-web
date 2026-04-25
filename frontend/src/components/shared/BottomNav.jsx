import React, { use } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdOutlineReorder, MdTableBar } from 'react-icons/md';
import { CiCircleMore } from 'react-icons/ci';
import { BiSolidDish } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';
import { setCustomer } from '../../redux/slices/customerSlice';
import { useDispatch } from 'react-redux';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [guestCount, setGuestCount] = React.useState(0);
  const increment = () => {
    if (guestCount < 6) {
      setGuestCount(guestCount + 1);
    }
  };
  const decrement = () => {
    if (guestCount > 0) {
      setGuestCount(guestCount - 1);
    }
  };
  const [name, setName] = React.useState(""); 

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    // send data to store
    // console.log("Clicked Create Order");
    dispatch(setCustomer({ name, guests: guestCount }));
    setIsModalOpen(false);
    navigate('/tables');
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate('/')}
        className={`flex items-center justify-center font-bold ${isActive('/')
            ? 'bg-[#343434] text-[#ababab]'
            : 'text-white'
          } w-[300px] rounded-[20px] p-3`}
      >
        <FaHome className="inline mr-2" size={20} /> <p>Home</p>
      </button>
      <button onClick={() => navigate('/kas')} className={`flex items-center justify-center font-bold ${isActive('/kas')
            ? 'bg-[#343434] text-[#ababab]'
            : 'text-white'
          } w-[300px] rounded-[20px] p-3`}
      >
        <MdOutlineReorder className="inline mr-2" size={20} /> <p>Kas</p>
      </button>
      <button onClick={() => navigate('/propo')} className={`flex items-center justify-center font-bold ${isActive('/propo')
            ? 'bg-[#343434] text-[#ababab]'
            : 'text-white'
          } w-[300px] rounded-[20px] p-3`}
      >
        <CiCircleMore className="inline mr-2" size={20} /> <p>Proposal dan LPJ</p>
      </button>
      <button onClick={() => navigate('/tables')} className={`flex items-center justify-center font-bold ${isActive('/tables')
            ? 'bg-[#343434] text-[#ababab]'
            : 'text-white'
          } w-[300px] rounded-[20px] p-3`}
      >
        <MdTableBar className="inline mr-2" size={20} /> <p>Tables</p>
      </button>
      
    </div>
  )
}

export default BottomNav;