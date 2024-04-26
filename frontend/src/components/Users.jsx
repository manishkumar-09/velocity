import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((err) => console.log(err.message));
  }, [filter]);
  return (
    <>
      <div>Users</div>
      <div>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search  users..."
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div>
          <div>
            {user.firstName[0]}
            {console.log(user, "users****")}
          </div>
        </div>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div>
        <Button
          label={"Send Money"}
          onClick={(e) => {
            navigate(`/send?id=${user._id} & name = ${user.firstName}`);
          }}
        />
      </div>
    </div>
  );
}
