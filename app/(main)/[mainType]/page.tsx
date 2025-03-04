import TypeDashboard from "@/app/(main)/[mainType]/_components/type-dashboard";
import { MotionDiv } from "@/components/ui-extension/motion-div";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";
import { notFound } from "next/navigation";

const sections = [
  {
    title: "Metal",
    description: "Track real-time metal commodity prices and market changes",
    commodities: [
      {
        name: "Gold",
        last: 1950,
        change: { value: 500, percentage: 0.15 },
        volume: 1000,
      },
      {
        name: "Silver",
        last: 23.5,
        change: { value: 2, percentage: -0.2 },
        volume: 1200,
      },
      {
        name: "Nickel",
        last: 16800,
        change: { value: 4010, percentage: 0.25 },
        volume: 800,
      },
      {
        name: "Copper",
        last: 3.85,
        change: { value: 0.5, percentage: -0.18 },
        volume: 1500,
      },
    ],
  },
  {
    title: "Agriculture",
    description: "Monitor agricultural commodity markets and price movements",
    commodities: [
      {
        name: "Corn",
        last: 4.85,
        change: { value: 0.2, percentage: 0.22 },
        volume: 2500,
      },
      {
        name: "Copra",
        last: 950,
        change: { value: 30, percentage: -0.08 },
        volume: 1800,
      },
      {
        name: "Soy Bean",
        last: 13.25,
        change: { value: 102, percentage: 0.35 },
        volume: 3000,
      },
      {
        name: "Cattle",
        last: 175.5,
        change: { value: 52, percentage: -0.15 },
        volume: 1200,
      },
    ],
  },
  {
    title: "Energy",
    description: "Follow energy commodity trends and market updates",
    commodities: [
      {
        name: "Diesel",
        last: 2.85,
        change: { value: 0.3, percentage: 0.15 },
        volume: 5000,
      },
      {
        name: "Bio-Diesel",
        last: 3.15,
        change: { value: 1, percentage: 0.18 },
        volume: 2800,
      },
      {
        name: "Coal",
        last: 145.75,
        change: { value: 90, percentage: -0.25 },
        volume: 4200,
      },
    ],
  },
];

interface Props {
  params: {
    mainType: string;
  };
}

export default function MainTypePage({ params }: Props) {
  const section = sections.find(
    (s) => s.title.toLowerCase() === params.mainType
  );

  if (!section) {
    notFound();
  }

  return (
    <div className="container mx-auto pt-32 pb-8 space-y-8">
      <MotionDiv
        className="max-w-screen-xl mx-auto flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
        <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
          <BreadcrumbList className="text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-zinc-400 hover:text-orange-500 transition-colors">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronsRight className="h-4 w-4 text-orange-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {section.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </MotionDiv>

      <MotionDiv
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
          {section.title} Market
        </h1>
        <p className="text-zinc-400">{section.description}</p>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <TypeDashboard section={section} />
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <TypeDashboard section={section} />
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <TypeDashboard section={section} />
      </MotionDiv>
    </div>
  );
}
