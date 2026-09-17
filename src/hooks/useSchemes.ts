import { useState, useEffect } from "react";
import { governmentSchemes } from "@/data/schemes";
import { Scheme } from "@/types/scheme";

export function useSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>(governmentSchemes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    fetch('/api/schemes')
      .then(res => res.json())
      .then((apiSchemes: Scheme[]) => {
         if (!isMounted) return;
         if (apiSchemes && Array.isArray(apiSchemes)) {
           setSchemes(apiSchemes);
         } else {
           setSchemes(governmentSchemes); // fallback
         }
         setLoading(false);
      })
      .catch(err => {
         console.error('Failed to fetch API schemes', err);
         if (isMounted) setLoading(false);
      });
      
    return () => {
      isMounted = false;
    };
  }, []);

  return { schemes, loading };
}
