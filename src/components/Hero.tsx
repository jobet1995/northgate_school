"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 rounded-2xl bg-blue-100 px-4 py-2 text-blue-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-medium">Welcome to Excellence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Empowering Future Leaders Through{" "}
              <span className="text-blue-700">Quality Education</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Where curiosity meets excellence. Join our community of learners
              and unlock your full potential in a supportive, innovative
              environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-2xl bg-blue-700 px-6 py-6 font-medium text-white shadow-sm hover:bg-blue-800 hover:shadow-md transition-all group"
              >
                <Link href="/admissions">
                  Enroll Now
                  <ArrowRight
                    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-2xl px-6 py-6 font-medium border-2 border-gray-300 hover:bg-gray-50 transition-all"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-1 shadow-2xl">
              <div className="h-full w-full rounded-2xl bg-white overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/8500704/pexels-photo-8500704.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Students engaged in collaborative learning in a modern classroom environment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-4 shadow-xl border border-gray-100 hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="rounded-2xl bg-green-100 p-2">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    98% Success Rate
                  </p>
                  <p className="text-xs text-gray-600">Student Achievement</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
