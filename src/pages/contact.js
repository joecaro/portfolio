import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useTheme, themes } from "../lib/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  return (
    <main>
      <Form />
    </main>
  );
}

export const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formDataValid, setFormDataValid] = useState(initialFormDataValid);
  const [formValid, setFormValid] = useState(false);

  const { theme } = useTheme();

  const portalId = "21057690";
  const formId = "c532a7e0-7e9c-41cd-9dcc-c6da3846b998";

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
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.errors[0].errorType === "INVALID_EMAIL") {
          setFormDataValid({ ...formDataValid, email: false });
        }
        toast.error(`oops! Error: ${err.response.data.errors[0].message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <Container>
      <h2>Contact Me</h2>
      <FormStyles id='contact' style={{ display: "grid" }}>
        <Fieldset className={"set"}>
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
            { formDataValid.firstname === false &&
              <p>Please fill in First Name field</p>
            }
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
            {formDataValid.lastname === false &&
              <p>Please fill in Last Name field</p>
            }
          </label>
        </Fieldset>
        <Fieldset className={"set"}>
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
           {formDataValid.company === false &&
              <p>Please fill in Company field</p>
           }
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
            {formDataValid.email === false &&
              <p>Please enter a valid email</p>
            }
          </label>{" "}
        </Fieldset>
        <Fieldset className={"set"}>
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
        </Fieldset>
        <button disabled={!formValid} onClick={handleSubmit} type='submit'>
          Submit
        </button>
      </FormStyles>
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
      {/* Same as */}
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  max-width: var(--maxWidth);
  margin: auto;
  padding: 10rem 0;
`;

const FormStyles = styled.form`
  margin: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90%;
  border: 3px solid #99999933;
  box-shadow: 3px 0 #99999933;

  .invalid {
    border: 1px solid var(--danger400);
  }

  button {
    width: 30%;
    justify-self: end;
    padding: 1rem 0;
    border-radius: 5px;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  padding: 0;
  border: none;
  label {
    display: grid;
    font-size: 1.2rem;
    input {
      width: 100%;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid var(--gray500);
      font-size: 1.5rem;
    }
    p {
      margin: 0.5rem;
      color: var(--danger400);
    }
    textarea {
      padding: 5px;
      border-radius: 5px;
      font-size: 1.5rem;
      max-width: 100%;
    }
  }
`;
