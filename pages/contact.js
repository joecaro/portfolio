import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

const portalId = "21057690";
const formId = "50c65d39-5e63-47b5-aeef-f84037ec61f2";

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

const convertToUriEncoded = (json) => {
  var str = [];
  for (const key in json) {
    str.push(key + "=" + json[key]);
    console.log(key + " -> " + json[key]);
  }
  return str.join("&");
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [formDataValid, setFormDataValid] = useState(initialFormData);
  const [formSent, setFormSet] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const portalId = "21057690";
  const formId = "50c65d39-5e63-47b5-aeef-f84037ec61f2";

  const handleDataChange = (e) => {
    let newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    checkIfFormIsValid();
  };

  const checkIfFieldIsValid = (e) => {
    console.log("focus out");
    console.log(e.target.name);
    switch (e.target.name) {
      case "email":
        if (e.target.value === "null" || !emailValidator.test(formData.email))
          setFormDataValid({ ...formDataValid, email: false });
        else setFormDataValid({ ...formDataValid, email: true });
        break;
      default:
        if (e.target.value === "")
          setFormDataValid({ ...formDataValid, [e.target.name]: false });
        else setFormDataValid({ ...formDataValid, [e.target.name]: true });
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

  const handleSubmit = (e) => {
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
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormData(initialFormData);
  };

  return (
    <main className={`${styles.main} ${styles.mainDark}`}>
      {!formSent && (
        <form className={styles.dark} style={{ display: "grid" }}>
          <fieldset className={styles.set}>
            <label>
              First Name
              <input
                className={
                  formDataValid.firstname !== false ? "" : styles.invalid
                }
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.firstname}
                name='firstname'
                type='text'></input>
            </label>
            <label>
              Last Name
              <input
                className={
                  formDataValid.lastname !== false ? "" : styles.invalid
                }
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.lastname}
                name='lastname'
                type='text'></input>
            </label>
            <label>
              Company
              <input
                className={
                  formDataValid.company !== false ? "" : styles.invalid
                }
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.company}
                name='company'
                type='text'></input>
            </label>
            <label>
              Email
              <input
                className={formDataValid.email !== false ? "" : styles.invalid}
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.email}
                name='email'
                type='email'></input>
            </label>
            <label>
              Message
              <input
                className={
                  formDataValid.message !== false ? "" : styles.invalid
                }
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.message}
                name='message'
                type='textarea'></input>
            </label>
          </fieldset>
          <button
            disabled={!formValid}
            style={{ width: "50%", justifySelf: "end" }}
            onClick={handleSubmit}
            type='submit'>
            Submit
          </button>
        </form>
      )}
      {formSent && <h1>Thanks</h1>}
    </main>
  );
}
