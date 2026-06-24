import React from "react";
import Link from "next/link";

import {
  FaGithub,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaSlack,
} from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/Feature/tooltip";
import { cn } from "@/src/lib/utils";

interface props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/@reactjsBd",
    icon: <FaYoutube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://www.github.com/reactjsBd",
    icon: <FaGithub className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.youtube.com/@reactjsBd",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.youtube.com/@reactjsBd",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "https://www.youtube.com/@reactjsBd",
    icon: <FaSlack className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, tooltipClassName, iconClassName }: props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-4", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={item?.href}
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-shop-green hoverEffect",
                  iconClassName,
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold",
                tooltipClassName,
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
