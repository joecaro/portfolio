"use client";

import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ax = axios.create({
    baseURL: "https://api.hsforms.com/submissions/v3/integration/submit",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

const emailValidator = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const initialFormData = {
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    message: "",
};
const initialFormDataValid = {
    firstname: null,
    lastname: null,
    email: null,
    company: null,
    message: null,
};

const convertToUriEncoded = (json: Record<string, unknown>) => {
    var str = [];
    for (const key in json) {
        str.push(key + "=" + json[key]);
        console.log(key + " -> " + json[key]);
    }
    return str.join("&");
};


export default function ContactForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [formDataValid, setFormDataValid] = useState(initialFormDataValid);
    const [formValid, setFormValid] = useState(false);

    const portalId = "21057690";
    const formId = "c532a7e0-7e9c-41cd-9dcc-c6da3846b998";

    const handleDataChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        checkIfFieldIsValid(e);
        let newFormData = {
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        };
        setFormData(newFormData);
        checkIfFormIsValid();
    };

    const checkIfFieldIsValid = (e: React.SyntheticEvent<HTMLInputElement>) => {
        switch (e.currentTarget.name) {
            case "email":
                if (
                    e.currentTarget.value === "null" ||
                    !emailValidator.test(formData.email)
                )
                    setFormDataValid({ ...formDataValid, email: false });
                else setFormDataValid({ ...formDataValid, email: true });
                break;
            default:
                if (e.currentTarget.value === "")
                    setFormDataValid({
                        ...formDataValid,
                        [e.currentTarget.name]: false,
                    });
                else
                    setFormDataValid({
                        ...formDataValid,
                        [e.currentTarget.name]: true,
                    });
        }
    };

    const checkIfFormIsValid = () => {
        if (
            formData.firstname === "" ||
            formData.email === "" ||
            formData.company === "" ||
            !emailValidator.test(formData.email)
        ) {
            setFormValid(false);
        } else setFormValid(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let data = {
            fields: [
                { name: "firstname", value: formData.firstname },
                { name: "lastname", value: formData.lastname },
                { name: "email", value: formData.email },
                { name: "company", value: formData.email },
                { name: "message", value: formData.message },
            ],
        };
        let encodedData = convertToUriEncoded(data);
        console.log(encodedData);
        ax.post(`/${portalId}/${formId}`, JSON.stringify(data))
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    toast.success("Thanks! I'll get back to you soon.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setFormData(initialFormData);
                }
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.data.errors[0].errorType === "INVALID_EMAIL") {
                    setFormDataValid({ ...formDataValid, email: false });
                }
                toast.error(
                    `oops! Error: ${err.response.data.errors[0].message}`,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );
            });
    };

    return (
        <div className='max-w-screen-lg mx-auto py-40'>
            <h2 className='text-3xl font-semibold mb-8'>Contact Me</h2>
            <form
                id='contact'
                className='grid gap-8 p-4 rounded-lg border-2 border-gray-300 shadow-lg max-w-full'
                onSubmit={handleSubmit}
            >
                <fieldset className='flex flex-wrap gap-8'>
                    <label className='block text-lg'>
                        First Name
                        <input
                            className={`w-full p-2 rounded-md border ${
                                formDataValid.firstname === false
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                            onBlur={checkIfFieldIsValid}
                            onChange={handleDataChange}
                            value={formData.firstname}
                            name='firstname'
                            type='text'
                        />
                        {formDataValid.firstname === false && (
                            <p className='text-red-500 mt-1'>
                                Please fill in First Name field
                            </p>
                        )}
                    </label>

                    <label className='block text-lg'>
                        Last Name
                        <input
                            className={`w-full p-2 rounded-md border ${
                                formDataValid.lastname === false
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                            onBlur={checkIfFieldIsValid}
                            onChange={handleDataChange}
                            value={formData.lastname}
                            name='lastname'
                            type='text'
                        />
                        {formDataValid.lastname === false && (
                            <p className='text-red-500 mt-1'>
                                Please fill in Last Name field
                            </p>
                        )}
                    </label>
                </fieldset>

                <fieldset className='flex flex-wrap gap-8'>
                    <label className='block text-lg'>
                        Company
                        <input
                            className={`w-full p-2 rounded-md border ${
                                formDataValid.company === false
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                            onBlur={checkIfFieldIsValid}
                            onChange={handleDataChange}
                            value={formData.company}
                            name='company'
                            type='text'
                        />
                        {formDataValid.company === false && (
                            <p className='text-red-500 mt-1'>
                                Please fill in Company field
                            </p>
                        )}
                    </label>

                    <label className='block text-lg'>
                        Email
                        <input
                            className={`w-full p-2 rounded-md border ${
                                formDataValid.email === false
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                            onBlur={checkIfFieldIsValid}
                            onChange={handleDataChange}
                            value={formData.email}
                            name='email'
                            type='email'
                        />
                        {formDataValid.email === false && (
                            <p className='text-red-500 mt-1'>
                                Please enter a valid email
                            </p>
                        )}
                    </label>
                </fieldset>

                <fieldset className='flex flex-col gap-4'>
                    <label className='block text-lg'>
                        Message
                        <textarea
                            className={`w-full p-2 rounded-md border ${
                                formDataValid.message === false
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                            onBlur={checkIfFieldIsValid}
                            onChange={handleDataChange}
                            value={formData.message}
                            name='message'
                            rows={5}
                        />
                    </label>
                </fieldset>

                <button
                    className={`w-1/3 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400 self-end`}
                    type='submit'
                    disabled={!formValid}
                >
                    Submit
                </button>
            </form>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
