import React from "react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleRoleSelection = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    }

    const loginMutation = useMutation({
        mutationFn: (reqData) => login(reqData),
        onSuccess: (res) => {
            const { data } = res;
            console.log(data);
            const { _id, name, email, role } = data.data;
            dispatch(setUser({ _id, name, email, role }));
            navigate("/");
        },
        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });
        }
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block ■ text-[#ababab] mb-2 text-sm font-medium">
                        Member Email
                    </label>
                    <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                        <input type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter member Email"
                            className="bg-transparent flex-1 ■ text-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block ■ text-[#ababab] mb-2 text-sm font-medium">
                        Password
                    </label>
                    <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                        <input type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter member password"
                            className="bg-transparent flex-1 ■ text-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="w-full mt-6 py-3 text-lg rounded-lg ■ bg-yellow-400 □ text-gray-900 font-bold">
                    Sign in
                </button>
            </form >
        </div >
    )
}

export default Register;