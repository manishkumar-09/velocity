export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}
//adding onchage on the input box

// export const InputBox = ({ label, placeholder }) => {
//   return (
//     <div className="flex flex-col bg-red-500">
//       <div className="flex items-center bg-blue-300">{label}</div>
//       <input type="text" placeholder={placeholder} className="bg-green-300" />
//     </div>
//   );
// };
