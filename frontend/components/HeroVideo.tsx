import "./herovideo.css";

const HeroVideo = () => {
  const companies = [
    "Shopify",
    "NVIDIA",
    "Airbnb",
    "Meta",
    "Lowes",
    "Cursor",
    "Google",
    "Microsoft",
    "Amazon",
    "Stripe",
    "Notion",
    "Figma",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="text-gray-500 text-sm font-semibold mb-12 tracking-widest">
        TRUSTED BY THE WORLD'S BEST COMPANIES
      </p>

      <div className="overflow-hidden w-full mb-8">
        <div className="scroll-container flex gap-12">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="text-gray-400 text-lg font-semibold whitespace-nowrap"
            >
              {company}
            </div>
          ))}
        </div>
      </div>

      <h2 className="pt-12 text-5xl max-w-6xl text-center whitespace-nowrap">
        Every team has AI.{" "}
        <span className="text-orange-600">Now they need a system.</span>
      </h2>
    </div>
  );
};

export default HeroVideo;
