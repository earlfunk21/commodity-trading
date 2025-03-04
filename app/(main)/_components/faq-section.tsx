"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

const faqData = [
  {
    question: "How do I start trading commodities?",
    answer:
      "To start trading commodities, you'll need to open an account with us, complete the verification process, and deposit funds. We provide comprehensive tutorials and support to help you begin your trading journey.",
  },
  {
    question: "What are the minimum investment requirements?",
    answer:
      "Our platform allows you to start with a minimum investment of $1,000. We offer various account tiers with different features and benefits based on your investment level.",
  },
  {
    question: "How are commodity prices determined?",
    answer:
      "Commodity prices are determined by global supply and demand, market conditions, geopolitical events, and other economic factors. Our platform provides real-time data and analysis to help you make informed decisions.",
  },
  {
    question: "What trading tools do you offer?",
    answer:
      "We provide advanced charting tools, technical analysis indicators, real-time market data, news feeds, and risk management features. Our platform also includes mobile trading capabilities and API access.",
  },
  {
    question: "How secure is your trading platform?",
    answer:
      "We implement bank-grade security measures, including 2FA, encryption, and regular security audits. Your funds are held in segregated accounts, and we maintain comprehensive insurance coverage.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-zinc-400 text-lg mb-8">
          Get answers to common questions about commodity trading on our
          platform.
        </p>

        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          defaultValue="question-0">
          {faqData.map(({ question, answer }, index) => (
            <AccordionItem
              key={index}
              value={`question-${index}`}
              className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex w-full items-center justify-between px-6 py-4",
                    "text-left text-lg font-medium text-zinc-200",
                    "hover:bg-zinc-800/50 transition-all duration-200",
                    "[&[data-state=open]>svg]:rotate-45"
                  )}>
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-red-500 transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="px-6 py-4 text-zinc-400">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
