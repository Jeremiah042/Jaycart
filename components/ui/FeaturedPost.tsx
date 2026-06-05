import Link from "next/link";
import { Cpu, User, Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/Constant/data";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 bg-white border border-gray-100
                 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-sm
                 transition-all duration-200 mb-6"
    >
      {/* Image side */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 min-h-[220px] md:min-h-[260px]
                      flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
            <Cpu size={30} className="text-green-600" />
          </div>
          <span className="text-xs text-green-600 font-medium tracking-wide uppercase">
            Featured
          </span>
        </div>
      </div>

      {/* Content side */}
      <div className="p-6 md:p-8 flex flex-col justify-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 w-fit text-[11px] font-medium uppercase
                     tracking-wide px-2.5 py-1 rounded-md bg-blue-100 text-blue-700"
        >
          <Cpu size={11} />
          Tech &amp; Gadgets
        </span>

        <h2 className="font-playfair text-2xl font-semibold leading-snug text-gray-800
                       group-hover:text-green-700 transition-colors">
          {post.title}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <User size={12} />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime} min read
          </span>
        </div>

        <div
          className="inline-flex items-center gap-2 w-fit mt-1 text-[13px] font-medium
                     text-green-600 border border-green-500 rounded-full px-4 py-1.5
                     group-hover:bg-green-500 group-hover:text-white transition-all"
        >
          Read article <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  );
}