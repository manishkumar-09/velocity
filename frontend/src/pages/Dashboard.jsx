import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Logout } from "../components/Logout";
import { Users } from "../components/Users";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <div className="">
      <Appbar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
      </div>
      <div className="flex justify-end pr-10">
        <Logout label={"Logout"} onClick={handleLogout} />
      </div>
    </div>
  );
};
