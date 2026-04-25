import React from 'react'
import { MdTableBar, MdCategory } from 'react-icons/md'
import { BiSolidDish } from 'react-icons/bi'
import Metrics from '../components/dashboard/Metrics'
import RecentOrders from '../components/dashboard/RecentOrders'
import Modal from '../components/dashboard/Modal'

const buttons = [
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
    { label: "Add Category", icon: <MdCategory />, action: "category" },
    { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payment"];

const Dashboard = () => {
    const [isTableModalOpen, setIsTableModalOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState("Metrics");

    const handleOpenModal = (action) => {
        if (action === "table") setIsTableModalOpen(true)
    }

    return (
        <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)]'>
            <div className='container mx-auto flex items-center justify-between py-14 px-5 md-px-4'>
                <div className='flex items-center gap-3'>
                    {
                        buttons.map(({ label, icon, action }) => {
                            return (
                                <button 
                                    key={action}
                                    onClick={() => handleOpenModal(action)}
                                    className='bg-[#181818] hover:bg-[#262626] px-8 py-3 rounded-md 
                                text-[15px] font-semibold text-white flex items-center gap-2'>
                                    {label} {icon}
                                </button>
                            );
                        })
                    }
                </div>
                <div className='flex items-center gap-3'>
                    {
                        tabs.map((tab) => {
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`bg-[#181818] hover:bg-[#262626] px-8 py-3 rounded-md text-[15px] 
                                font-semibold text-white flex items-center gap-2 
                                ${activeTab === tab ? 'bg-[#262626]' : 'bg-[#1a1a1a] hover:bg-[#262626]'}`}>
                                    {tab}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
            {activeTab === "Metrics" && <Metrics />}
            {activeTab === "Orders" && <RecentOrders />}

            {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen}/>}
        </div>
    )
}

export default Dashboard