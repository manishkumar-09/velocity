import { Link } from "react-router-dom";
export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div>
      <div>{label}</div>
      <Link className="" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};
