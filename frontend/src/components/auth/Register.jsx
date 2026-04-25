import React from "react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { register } from "../../https"
import { useSnackbar, enqueueSnackbar } from "notistack"

const Register = ({setIsRegister}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "member"
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        registerMutation.mutate(formData);
    }
    const registerMutation = useMutation({
        mutationFn: (reqData) => register(reqData),
        onSuccess: (res) => {
            const { data } = res;
            enqueueSnackbar(data.message, { variant: "success" });
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "member"
            })

            setTimeout(() => {
                setIsRegister(false);
            }, 1500);
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
                        Member Name
                    </label>
                    <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter member name"
                            className="bg-transparent flex-1 ■ text-white focus:outline-none"
                            required
                        />
                    </div>
                </div>
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
                    Sign up
                </button>
            </form >
        </div >
    )
}

export default Register;