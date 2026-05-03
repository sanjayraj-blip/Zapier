"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BACKEND_URL } from "../config";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen bg-white">
      <div className="pl-60 flex-1 flex flex-col justify-center px-12 py-12">
        <h1 className="text-6xl mb-8 max-w-3xl leading-tight">
          AI Automation starts and scales with Zapier
        </h1>

        <p className="text-gray-600 text-lg mb-8 max-w-md">
          Orchestrate AI across your teams, tools, and processes. Turn ideas
          into automated action today, and power tomorrow's business growth.
        </p>

        <div className="space-y-4 max-w-md">
          <div className="flex items-start gap-3">
            <span className="text-orange-600 text-xl">✓</span>
            <span className="text-gray-800">
              Integrate 8,000+ apps and 300+ AI tools without code
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-orange-600 text-xl">✓</span>
            <span className="text-gray-800">
              Build AI-powered workflows in minutes, not weeks
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-orange-600 text-xl">✓</span>
            <span className="text-gray-800">
              14-day trial of all premium features and apps
            </span>
          </div>
        </div>
      </div>

      <div className="pr-60 flex-1 flex flex-col justify-center items-center px-12 py-12">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-8">
          <Input
            label={"Email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeHolder="Your Email"
          />
          <Input
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeHolder="Your Password"
          />

          <div className="pt-4 flex items-center justify-center">
            <PrimaryButton
              size="big"
              onClick={async () => {
                const res = await axios.post(
                  `${BACKEND_URL}/api/v1/user/signin`,
                  {
                    username: email,
                    password,
                  },
                );
                localStorage.setItem("token", res.data.token);
                router.push("/dashboard");
              }}
            >
              Login
            </PrimaryButton>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            New to Zapier?{" "}
            <a href="/signup" className="text-gray-900 underline font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
