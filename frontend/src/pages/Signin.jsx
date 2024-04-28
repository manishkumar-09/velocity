import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-slate-200 h-screen flex justify-center">
        <div className=" flex flex-col justify-center ">
          <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4">
            <Heading label={"Sign in"} />
            <SubHeading label={"fill the details to sign in"} />
            <InputBox
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              label={"Email"}
              placeholder={"Enter email"}
            />
            <InputBox
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              label={"Password"}
              placeholder={"Enter password"}
            />
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:5000/api/v1/login",
                  {
                    userName,
                    password,
                  }
                );

                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign in"}
            />

            <BottomWarning
              to={"/signup"}
              label={"Don't have an account ?"}
              buttonText={"Sign up"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
