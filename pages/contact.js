import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Cover from "../components/Cover";
import styled from "styled-components";
import { useTheme, themes } from "../lib/ThemeContext";
import Light from "../components/Light";
import Fade from "react-reveal/Fade";

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

// component
export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [formDataValid, setFormDataValid] = useState(initialFormData);
  const [formSent, setFormSet] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const { theme } = useTheme();

  const portalId = "21057690";
  const formId = "50c65d39-5e63-47b5-aeef-f84037ec61f2";

  const handleDataChange = (e) => {
    checkIfFieldIsValid(e);
    let newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    checkIfFormIsValid();
  };

  const checkIfFieldIsValid = (e) => {
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
    <main
      className={`${styles.main} ${
        theme === themes.dark ? styles.mainDark : styles.mainLight
      }`}>
      <Light />
      <Cover />

      {!formSent && (
        <FormStyles
          theme={theme}
          className={styles.dark}
          style={{ display: "grid" }}>
          <fieldset className={"set"}>
            <label>
              First Name
              <input
                className={formDataValid.firstname === false ? "invalid" : ""}
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.firstname}
                name='firstname'
                type='text'></input>
              <Fade bottom when={formDataValid.firstname === false}>
                <p>Please fill in First Name field</p>
              </Fade>
            </label>
            <label>
              Last Name
              <input
                className={formDataValid.lastname === false ? "invalid" : ""}
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.lastname}
                name='lastname'
                type='text'></input>
              <Fade bottom when={formDataValid.lastname === false}>
                <p>Please fill in Last Name field</p>
              </Fade>
            </label>
          </fieldset>
          <fieldset className={"set"}>
            <label>
              Company
              <input
                className={formDataValid.company === false ? "invalid" : ""}
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.company}
                name='company'
                type='text'></input>
              <Fade bottom when={formDataValid.company === false}>
                <p>Please fill in Company field</p>
              </Fade>
            </label>
            <label>
              Email
              <input
                className={formDataValid.email === false ? "invalid" : ""}
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.email}
                name='email'
                type='email'></input>
              <Fade bottom when={formDataValid.email === false}>
                <p>Please enter a valid email</p>
              </Fade>
            </label>{" "}
          </fieldset>
          <fieldset className={"set"}>
            <label>
              Message
              <textarea
                className={formDataValid.message === false ? "invalid" : ""}
                required
                onBlur={checkIfFieldIsValid}
                onChange={handleDataChange}
                value={formData.message}
                cols='46'
                rows='5'
                name='message'
                type='text'></textarea>
            </label>
          </fieldset>
          <button disabled={!formValid} onClick={handleSubmit} type='submit'>
            Submit
          </button>
        </FormStyles>
      )}
      {formSent && <h1>Thanks</h1>}
    </main>
  );
}

const FormStyles = styled.form`
  margin: auto;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  max-width: 90%;
  box-shadow: 0 0 30px -10px #99999933;

  .set {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    border: none;
    label {
      display: grid;
      font-size: 1.2rem;
      input {
        padding: 5px;
        border-radius: 5px;
        border: ${({ theme }) => `1px solid ${theme.header}`};
        font-size: 1.5rem;
      }
      p {
        margin: 0.5rem;
        color: #ef4737;
      }
      textarea {
        padding: 5px;
        border-radius: 5px;
        font-size: 1.5rem;
      }
    }
  }

  button {
    width: 30%;
    justify-self: end;
    padding: 1rem 0;
    border-radius: 5px;
  }
  .invalid {
    border: 1.5px solid #ef4737;
    background-color: #ffe1de;
  }
`;
