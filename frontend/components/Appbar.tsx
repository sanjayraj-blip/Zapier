"use client";
import { useRouter } from "next/navigation";
import LinkButton from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";

const App = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between border-b">
      <div className="flex flex-col justify-center p-4">Zapier</div>
      <div className="flex">
        <div className="pr-4">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        </div>
        <div className="pr-4">
          <LinkButton onClick={() => router.push("/login")}>Login</LinkButton>
        </div>
        <PrimaryButton
          onClick={() => {
            router.push("./signup");
          }}
        >
          Signup
        </PrimaryButton>
      </div>
    </div>
  );
};

export default App;
