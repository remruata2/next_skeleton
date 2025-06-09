"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/generated/prisma";

interface AdminSidebarProps {
  setSidebarOpen?: (open: boolean) => void;
}

export default function AdminSidebar({ setSidebarOpen }: AdminSidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const baseLinkClasses = "flex items-center px-3 py-2 text-sm font-medium rounded-md";
  const activeLinkClasses = "bg-gray-200 text-gray-900";
  const inactiveLinkClasses = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  return (
    // This is the actual sidebar panel content
    <div className="flex flex-col h-full w-full bg-white shadow-xl overflow-y-auto">
        {/* User info */}
        <div className="flex-shrink-0 flex items-center px-4 py-4 border-b border-gray-200">
          <div className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {session?.user.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {session?.user.username || "User"}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {session?.user.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link
            href="/admin"
            onClick={() => setSidebarOpen && setSidebarOpen(false)}
            className={`${baseLinkClasses} ${pathname === '/admin' ? activeLinkClasses : inactiveLinkClasses}`}
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>

          {session?.user.role === UserRole.admin && (
            <Link
              href="/admin/users"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={`${baseLinkClasses} ${pathname.startsWith('/admin/users') ? activeLinkClasses : inactiveLinkClasses}`}
            >
              <svg
                className="mr-3 h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              User Management
            </Link>
          )}
        </nav>

        {/* Sign Out Button */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out
          </button>
        </div>
    </div>
  );
}
