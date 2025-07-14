import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogo = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className="text-2xl font-bold text-brand-navy cursor-pointer"
              onClick={handleLogo}
            >
              SolePeak
            </span>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-brand-navy font-medium">{user.displayName || user.email}</span>
                <Button
                  variant="outline"
                  className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                  onClick={logout}
                >
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                    Увійти
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-brand-orange text-white hover:bg-orange-600">
                    Зареєструватися
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
