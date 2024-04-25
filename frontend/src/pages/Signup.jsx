import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export const SignUp = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="bg-slate-200 h-screen flex justify-center">
        <div className=" flex flex-col justify-center ">
          <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"fill the details to sign up in"} />
            <InputBox
              onChange={(e) => setFirstname(e.target.value)}
              label={"Firstname"}
              placeholder={"Enter firstname"}
            />
            <InputBox
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              label={"Lastname"}
              placeholder={"Enter lastname"}
            />
            <InputBox
              onChange={(e) => setUserName(e.target.value)}
              label={"email"}
              placeholder={"Enter email"}
            />
            <InputBox
              onChange={(e) => setPassword(e.target.value)}
              label={"password"}
              placeholder={"Enter password"}
            />
            <Button
              onClick={() => {
                axios
                  .post("http://localhost:5000/api/v1/signup", {
                    userName,
                    password,
                    firstName,
                    lastName,
                  })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }}
              label={"Sign up"}
            />

            <BottomWarning
              to={"/signin"}
              label={"Already have an account ?"}
              buttonText={"Sign in"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
