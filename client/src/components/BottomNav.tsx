import { Link, useLocation } from "wouter";
import { primaryNavItems } from "@/lib/navigation-config";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background"
      data-testid="bottom-navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {primaryNavItems.map((item) => {
          const isActive = location === item.url;
          return (
            <Link 
              key={item.url} 
              href={item.url}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[64px]",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              data-testid={item.testId}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isActive && "fill-current"
              )} />
              <span className="text-xs font-medium">
                {item.title.replace(" View", "")}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
