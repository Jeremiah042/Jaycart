import { cn } from "@/src/lib/utils";

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-3xl font-bold text-shop-green-950 capitalize tracking-wide font-sans",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const SubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn("font-semibold text-shop-green-950 font-sans", className)}
    >
      {children}
    </h3>
  );
};

export const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>;
};
