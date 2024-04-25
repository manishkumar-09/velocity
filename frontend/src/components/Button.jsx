export const Button = ({ label, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        {label}
      </button>
    </div>
  );
};
