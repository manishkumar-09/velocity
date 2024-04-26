import { Button } from "./Button";

export const Logout = ({ label, onClick }) => {
  return (
    <>
      <Button onClick={onClick} label={label} />
    </>
  );
};
