"use client";
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";
import Feature from "./Feature";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="text-gray-500 text-sm font-semibold mb-6 tracking-widest">
        AI AUTOMATION, GOVERNED
      </p>

      <h1 className="text-6xl font-bold text-center mb-6 max-w-4xl">
        Your tools. Your rules. Any AI.
      </h1>

      <p className="text-lg text-gray-600 text-center max-w-2xl mb-12">
        Zapier gives teams one place to set guardrails, manage model access, and
        see everything — so everyone can build with AI confidently, on any
        model, without waiting for permission.
      </p>

      <div className="flex gap-4 mb-8">
        <PrimaryButton
          size="big"
          onClick={() => {
            router.push("./signup");
          }}
        >
          Start free with email
        </PrimaryButton>
        <button className="px-6 py-3 border border-gray-900 rounded-xl text-gray-900 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
          Contact Sales
        </button>
      </div>

      <div className="flex gap-16 mb-8">
        <Feature number="450K+" text="Agents built" />
        <Feature number="9,000+" text="App integrations with governed access" />
        <Feature number="3.39M+" text="MCP tool calls completed" />
      </div>

      <div className="flex flex-row gap-6 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <span>🛡️</span>
          <span>SOC 2 (TYPE II)</span>
        </div>

        <div className="flex items-center gap-2">
          <span>⚖️</span>
          <span>GDPR + CCPA COMPLIANT</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
