import { useEffect } from "react";
import { useLocation } from "react-router";

export function useViewTransitions() {
  const location = useLocation();

  useEffect(() => {
    if (!document.startViewTransition) return;
  
    document.startViewTransition(() => {});
  }, [location]);
}