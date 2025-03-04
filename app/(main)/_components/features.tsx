const features = [
  {
    title: "Market Analysis",
    description: "Analyze market trends and make informed trading decisions.",
  },
  {
    title: "Trade Execution",
    description: "Execute trades seamlessly with our intuitive platform.",
  },
  {
    title: "Risk Management",
    description: "Manage your risks effectively with advanced tools.",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent pb-6">
          Enhance Your Trading Experience
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col text-start">
              <div className="mb-5 sm:mb-6 w-full aspect-[4/5] bg-muted rounded-xl" />
              <span className="text-2xl font-bold tracking-tight">
                {feature.title}
              </span>
              <p className="mt-2 max-w-[25ch] text-muted-foreground/80 text-[17px] font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
