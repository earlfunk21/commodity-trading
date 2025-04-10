import { BarChart3, Coins, Shield } from "lucide-react";

const features = [
  {
    title: "Commodity Forward Trading",
    description:
      "Access future-dated contracts with transparent pricing and simplified execution.",
    icon: BarChart3,
  },
  {
    title: "Secured, Fair, Transparent Trading Practices",
    description:
      "Every transaction is protected with advanced security and verifiable fairness protocols.",
    icon: Shield,
  },
  {
    title: "Tokenized Commodities",
    description:
      "Digital ownership of physical assets enabling fractional trading and enhanced liquidity.",
    icon: Coins,
  },
];

export default function Features() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent pb-6">
          The Way Trading Should Be!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 px-4">
          Our platform combines cutting-edge technology with decades of
          commodity trading expertise to deliver a revolutionary trading
          experience.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col text-start p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-transparent dark:from-orange-900/30 dark:to-transparent rounded-bl-full opacity-70"></div>
              <div className="mb-4 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg w-fit relative z-10">
                <feature.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-3 relative z-10">
                {feature.title}
              </span>
              <p className="text-gray-600 dark:text-gray-300 relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
