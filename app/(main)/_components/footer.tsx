"use client";

import { MotionDiv } from "@/components/ui-extension/motion-div";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Bitcoin,
  Facebook,
  Globe2,
  Instagram,
  LinkedinIcon,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "News & Events", href: "/news-event" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Trading Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: Globe2, href: "#", label: "Website" },
  { icon: Bitcoin, href: "#", label: "Crypto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-gradient-to-b from-black to-zinc-900 ">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                ACTS Commodity Forward Trading
              </h3>
            </Link>
            <p className="mt-4 text-zinc-400 max-w-sm">
              Your trusted platform for global commodity trading. Access
              real-time market data, advanced trading tools, and expert
              analysis.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-lg transition-colors duration-200",
                    "bg-zinc-900 hover:bg-zinc-800",
                    "text-zinc-400 hover:text-red-500"
                  )}>
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </MotionDiv>

          {/* Links Columns */}
          {footerLinks.map((column, idx) => (
            <MotionDiv
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-red-500 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400">
          <p>
            © {new Date().getFullYear()} ACTS Commodity Forward Trading. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-red-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
