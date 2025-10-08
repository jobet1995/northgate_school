"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Target, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/8500657/pexels-photo-8500657.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students and teachers collaborating in a modern learning environment"
                width={800}
                height={500}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-blue-700 text-white p-6 shadow-xl max-w-xs">
              <p className="text-4xl font-extrabold">25+</p>
              <p className="text-sm font-medium">
                Years of Excellence in Education
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <p className="text-blue-700 font-semibold uppercase tracking-wide text-sm mb-2">
                About Our School
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Building Foundations for Tomorrow&apos;s Leaders
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              At Northgate Academy, we believe every student has unique talents
              waiting to be discovered. Our dedicated faculty and modern
              facilities create an environment where curiosity thrives and
              excellence becomes a habit.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-blue-100 p-3 flex-shrink-0">
                  <Target
                    className="h-6 w-6 text-blue-700"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Our Mission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To provide transformative education that nurtures critical
                    thinking, creativity, and character.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-blue-100 p-3 flex-shrink-0">
                  <Eye className="h-6 w-6 text-blue-700" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Our Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To be a beacon of educational excellence that inspires
                    lifelong learning and global citizenship.
                  </p>
                </div>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-blue-700 px-6 py-6 font-medium text-white shadow-sm hover:bg-blue-800 hover:shadow-md transition-all group"
            >
              <Link href="/about">
                Discover Our Story
                <ArrowRight
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
