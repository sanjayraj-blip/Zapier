"use client";

const Input = ({
  label,
  placeHolder,
  type = "text",
  onChange,
}: {
  label: string;
  placeHolder: string;
  type?: "text" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <label className="text-gray-900">{label}</label>
      <input
        className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-orange-600 text-gray-900 placeholder-gray-400"
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
