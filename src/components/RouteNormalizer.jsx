import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * RouteNormalizer component
 * 
 * Responsibilities:
 * 1. Detects trailing slashes in the URL (e.g., /ambulant/)
 * 2. Redirects to the non-trailing-slash version (e.g., /ambulant)
 * 3. Ensures consistent URL structure across the application
 * 4. Preserves query parameters and hash fragments during redirect
 */
const RouteNormalizer = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if path ends with / and is not just root /
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      // Remove trailing slash
      const newPath = location.pathname.slice(0, -1) + location.search + location.hash;
      // Redirect replacing the current history entry
      navigate(newPath, { replace: true });
    }
  }, [location, navigate]);

  // Render children normally
  return children;
};

export default RouteNormalizer;