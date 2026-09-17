import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-aurora px-4">
      <div className="text-center">
        <p className="font-mono text-lilac">404</p>
        <h1 className="mt-2 font-display text-heading text-quartz">Page not found</h1>
        <p className="mt-3 text-ash">The route {location.pathname} does not exist.</p>
        <Link to="/">
          <Button variant="default" className="mt-8">
            Return home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
