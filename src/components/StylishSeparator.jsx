import { cn } from "../lib/utils";

export default function StylishSeparator({ className }) {
  return (
    <div className={cn("relative h-24 w-full overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-20"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
      </div>
      <svg className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-sky-500 animate-pulse"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-sky-500 opacity-10 animate-ping"></div>
      </div>
    </div>
  )
}