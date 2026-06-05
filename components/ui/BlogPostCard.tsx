"use client";

import Link from "next/link";
import {
  Tag,
  Shirt,
  ShoppingCart,
  Headphones,
  Home,
  Gift,
  Smartphone,
  Clock,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { BlogPost } from "@/Constant/data";

const iconMap: Record<string, React.ReactNode> = {
  tag: <Tag size={22} />,
  shirt: <Shirt size={22} />,
  shoppingCart: <ShoppingCart size={22} />,
  headphones: <Headphones size={22} />,
  home: <Home size={22} />,
  gift: <Gift size={22} />,
  smartphone: <Smartphone size={22} />,
};

const colorThemeMap: Record<
  BlogPost["colorTheme"],
  { bg: string; iconColor: string }
> = {
  green:  { bg: "bg-green-50",  iconColor: "text-green-600" },
  amber:  { bg: "bg-amber-50",  iconColor: "text-amber-600" },
  blue:   { bg: "bg-blue-50",   iconColor: "text-blue-600"  },
  pink:   { bg: "bg-pink-50",   iconColor: "text-pink-600"  },
  purple: { bg: "bg-purple-50", iconColor: "text-purple-600"},
  red:    { bg: "bg-red-50",    iconColor: "text-red-500"   },
};

const badgeMap: Record<
  BlogPost["category"],
  { label: string; className: string }
> = {
  "Shopping Tips": {
    label: "Tips",
    className: "bg-green-100 text-green-700",
  },
  "Style & Trends": {
    label: "Style",
    className: "bg-yellow-100 text-yellow-700",
  },
  "Tech & Gadgets": {
    label: "Tech",
    className: "bg-blue-100 text-blue-700",
  },
  Deals: {
    label: "Deals",
    className: "bg-pink-100 text-pink-700",
  },
  Guide: {
    label: "Guide",
    className: "bg-purple-100 text-purple-700",
  },
};

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { bg, iconColor } = colorThemeMap[post.colorTheme];
  const badge = badgeMap[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col
                 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      {/* Card image area */}
      <div className={`h-32 flex items-center justify-center ${bg}`}>
        <div className="w-11 h-11 rounded-full bg-white/60 flex items-center justify-center">
          <span className={iconColor}>{iconMap[post.icon]}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span
          className={`inline-flex items-center w-fit text-[11px] font-medium uppercase tracking-wide
                      px-2.5 py-1 rounded-md ${badge.className}`}
        >
          {badge.label}
        </span>

        <h3 className="font-playfair text-[15px] font-semibold leading-snug text-gray-800 group-hover:text-green-700 transition-colors">
          {post.title}
        </h3>

        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {post.date}
            </span>
          </div>
          <div
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center
                          group-hover:bg-green-500 group-hover:border-green-500 transition-all"
          >
            <ArrowRight
              size={13}
              className="text-gray-400 group-hover:text-white transition-colors"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}