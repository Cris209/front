export function Card({ children, className = "" }) {
  return <div className={`bg-[#f5f5dc] shadow-lg rounded-lg ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
}
