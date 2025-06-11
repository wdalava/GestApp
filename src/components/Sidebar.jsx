import { ChevronLeft, ChevronRight, TrendingUp, User } from "lucide-react";
import { useEffect } from "react";
import menuItems from "../data/menuItems";
import { Link, useLocation } from "react-router-dom";
import users from "../data/users";

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  // close the sidebar when we are on mobile and when the user click onside the sidebar or on the sidebar link

  useEffect(() => {
    // function to close the sidebar
    const handleClickOutside = () => {
      setIsCollapsed(true);
      window.removeEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleClickOutside);
    };

    // get isMobile screen
    const isMobile = window.innerWidth <= 640;

    // verification is we are on mobile and sidebar is collapsed
    if (isMobile && !isCollapsed) {
      window.addEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleClickOutside);
    };
  }, [isCollapsed]);

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration 300 ease-in-out ${
        isCollapsed ? "w-16" : "w-52 sm:w-64"
      } flex-col shadow-2xl`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg truncate">GestApp</h2>
                <p className="text-xs text-slate-400 truncate">
                  Mon gestionnaire
                </p>
              </div>
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="cursor-pointer p-0.5 sm:p-1.5 rounded-lg hover:bg-slate-700 transition-colors shrink-0"
          >
            {!isCollapsed ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-auto">
        <div className="space-y-1">
          {menuItems.map((i) => {
            const Icon = i.logo;
            const isActiveItem = location.pathname === i.path;

            return (
              <Link
                to={i.path}
                key={i.id}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl 
                    transition-all duration-200 group text-left ${
                      isCollapsed && "justify-center px-2"
                    } ${
                  isActiveItem
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
                    : "hover:bg-slate-700/50 hover-translate-x-1"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActiveItem
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />
                {!isCollapsed && (
                  <span
                    className={`font-medium truncate ${
                      isActiveItem ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {i.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700/50 shrink-0">
          <div className="flex items-center space-x-3 rounded-lg transition-colors p-3 bg-slate-700/30 hover:bg-slate-700/50 cursor-pointer min-w-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">
                {users[0]?.name || "Utilisateur"}
              </p>
              <p className="text-slate-400 text-sx truncate">
                {users[0]?.email || "user@exemple.com"}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
