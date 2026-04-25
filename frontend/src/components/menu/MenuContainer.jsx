import React from "react";
import { GrRadialSelected } from "react-icons/gr";
import { menus } from "../../constants/index.js";
import { getBgColor } from "../../utils/index.js";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice.js";

// Example background color generator


const MenuContainer = () => {
    const [selected, setSelected] = React.useState(menus[0]);
    const [itemCounts, setItemCounts] = React.useState({}); // { [itemId]: count }
    const dispatch = useDispatch();

    const increment = (id) => {
        setItemCounts((prev) => ({
            ...prev,
            [id]: Math.min((prev[id] || 0) + 1, 6)
        }));
    };

    const decrement = (id) => {
        setItemCounts((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0)
        }));
    };

    const handleAddToCart = (item) => {
        const count = itemCounts[item.id] || 0;
        if (count === 0) return;
        const newItem = {
            id: Date.now(),
            name: item.name,
            pricePerQuantity: item.price,
            quantity: count,
            price: item.price * count
        };
        dispatch(addItems(newItem));
        setItemCounts((prev) => ({ ...prev, [item.id]: 0 }));
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
                {menus.map((menu) => {
                    return (
                        <div
                            key={menu.id}
                            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer hover:bg-[#2a2a2a]"
                            style={{ backgroundColor: menu.bgColor }}
                            onClick={() => {
                                setSelected(menu);
                                setItemCounts({});
                            }}
                        >
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                                    {menu.icon} {menu.name}
                                </h1>
                                {selected.id === menu.id && (<GrRadialSelected className="text-white" size={20} />)}
                            </div>
                            <p className="text-[#ababab] text-sm font-semibold">
                                {menu.items.length} Items
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
                {selected?.items.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer hover:bg-[#2a2a2a]"
                            style={{ backgroundColor: ['#2a2a2a'] }}
                        >
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                                    {item.name}
                                </h1>
                                <button onClick={() => handleAddToCart(item)} className='bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg cursor-pointer'><FaShoppingCart /></button>

                                <div className="flex items-center justify-between bg-[#1f1f1f] px-1 py-1 rounded-lg gap-6">
                                    <button
                                        onClick={() => decrement(item.id)}
                                        className="text-yellow-500 text-lg"
                                    >
                                        &minus;
                                    </button>
                                    <span className="text-white">{itemCounts[item.id] || 0}</span>
                                    <button
                                        onClick={() => increment(item.id)}
                                        className="text-yellow-500 text-lg"
                                    >
                                        &#43;
                                    </button>
                                </div>

                            </div>
                            <p className="text-[#ababab] text-sm font-semibold">
                                Rp. {item.price}
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default MenuContainer;
