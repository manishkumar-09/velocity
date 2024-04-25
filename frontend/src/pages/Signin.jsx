import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  return (
    <>
      <div className="bg-slate-200 h-screen flex justify-center">
        <div className=" flex flex-col justify-center ">
          <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4">
            <Heading label={"Sign in"} />
            <SubHeading label={"fill the details to sign in"} />
            <InputBox label={"Email"} placeholder={"Enter email"} />
            <InputBox label={"Password"} placeholder={"Enter password"} />
            <Button label={"Sign in"} />
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
