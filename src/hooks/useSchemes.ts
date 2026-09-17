import { useState, useEffect } from "react";
import { Scheme } from "@/types/scheme";

export function useSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/schemes')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load schemes');
        return res.json();
      })
      .then((apiSchemes: Scheme[]) => {
        if (!isMounted) return;
        setSchemes(Array.isArray(apiSchemes) ? apiSchemes : []);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch API schemes', err);
        if (isMounted) {
          setSchemes([]);
          setError(err.message || 'Failed to load schemes');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { schemes, loading, error };
}
