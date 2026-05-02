"use client";
import { useRouter } from "next/navigation";
import LinkButton from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";

const App = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between border-b border-gray-300">
      <div className="flex flex-col text-2xl font-extrabold font-weight:700 justify-center p-4">
        Zapier
      </div>
      <div className="flex">
        <div className="pr-4">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        </div>
        <div className="pr-4">
          <LinkButton onClick={() => router.push("./login")}>Login</LinkButton>
        </div>
        <div className="pr-4 flex items-center">
          <PrimaryButton
            onClick={() => {
              router.push("./signup");
            }}
          >
            Signup
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default App;
