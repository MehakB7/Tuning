"use client";

import React, { useState } from "react";
import { fields } from "./constant";
import Input from "@/components/Input/Input";
import Link from "next/link";
import Button from "@/components/Button/Button";
import style from "../page.module.css";
import Seprator from "@/components/seprator/Seprator";
import { confirmSignup, signup } from "@/services/auth";
import { useRouter } from "next/navigation";
import { hasError, performValidations } from "@/helper/validator";

const SignUp = (props) => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const router = useRouter();

  const [codeSent, setMailSend] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [confirmationCode, setConfirmationCode] = useState("");

  const onCodeUpdate = (code, value) => {
    console.log("on", code, value);
    setConfirmationCode(value);
  };

  const onChange = (name, value) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setInfo((prev) => ({ ...prev, [name]: value }));

    if (name == "confirm") {
      console.log("isndie confirm", info.password, info.confirm);

      if (info.password !== value) {
        setErrors((prev) => ({
          ...prev,
          confirm: "Password is not same",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirm: "",
        }));
      }
    }
  };

  const handleSignUp = async () => {
    const error = performValidations(fields, info);

    if (hasError(error)) {
      setErrors(error);
      return;
    }

    const response = await signup({
      email: info.email,
      password: info.password,
      name: info.name,
    });

    if (!response.err) {
      console.log("inside this response is", response);
      setMailSend(true);
    }
  };

  const confirmationSingUp = async () => {
    const response = await confirmSignup({
      confirmationCode: confirmationCode,
      email: info.email,
    });

    if (!response.error) {
      // navigate to login screen()
      router.push("/login");
    }
  };

  return (
    <div className={style.centered}>
      <div className={style.card}>
        {!codeSent ? (
          <>
            {fields.map((item, index) => (
              <Input
                key={index}
                {...item}
                onChange={onChange}
                value={info[item.name]}
                isInvalid={errors[item.name]?.length != 0}
                error={errors[item.name]}
              />
            ))}

            <Button onClick={handleSignUp}> Get Code</Button>
          </>
        ) : (
          <>
            <Input
              input={confirmationCode}
              onChange={onCodeUpdate}
              onClick={handleSignUp}
              placeholder={"Enter code"}
              label={"Enter confirmation code"}
              name="code"
            />
            <Button onClick={confirmationSingUp}>Singup</Button>
          </>
        )}
        <div className={style.info}>
          Already have an account? <Link href={"/login"}> Login</Link>
        </div>
        <Seprator />

        <Button onClick={() => {}}> Continue as Guest</Button>
      </div>
    </div>
  );
};

export default SignUp;
