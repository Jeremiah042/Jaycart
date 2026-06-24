"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts, filterCategories, BlogCategory } from "@/src/Constant/data";
import FeaturedPost from "./FeaturedPost";
import BlogPostCard from "./BlogPostCard";
import NewsletterStrip from "./NewsLetterStrip";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const featuredPost = blogPosts.find((p) => p.featured);

  const gridPosts = blogPosts.filter((p) => {
    if (p.featured) return false;
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Header ── */}
        <div className="flex items-end justify-between pb-5 border-b border-gray-100 mb-6">
          <div>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Our Blog
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Tips, trends &amp; deals — straight from us to you
            </p>
          </div>
          <Link
            href="/blog/all"
            className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium
                       text-gray-500 border border-gray-200 rounded-full px-4 py-2
                       hover:bg-gray-50 hover:text-gray-800 transition-all"
          >
            View all posts <ArrowRight size={13} />
          </Link>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-7">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[13px] border rounded-full px-4 py-1.5 transition-all duration-150
                ${
                  activeCategory === cat
                    ? "bg-green-500 text-white border-green-500 font-medium"
                    : "bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured post (only shown on "All" tab) ── */}
        {activeCategory === "All" && featuredPost && (
          <FeaturedPost post={featuredPost} />
        )}

        {/* ── Posts grid ── */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {gridPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 text-sm">
            No posts found in this category yet.
          </div>
        )}

        {/* ── Newsletter ── */}
        <NewsletterStrip />
      </div>
    </main>
  );
}
