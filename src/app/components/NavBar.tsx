"use client";

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: "",
      },
    });


  return (
    <nav className="bg-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex-shrink-0 flex items-center">
        <a href="#" className="font-bold text-xl text-gray-800">Ably Piano</a>
      </div>
      <div className="hidden sm:block sm:ml-6">
        <div className="flex space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</a>
          {isAuthenticated && (
            <>
              {/* <a href="loggedin/chat" class="text-gray-600 hover:text-gray-900 font-medium">Chat</a> */}
              <a href="loggedin/music" className="text-gray-600 hover:text-gray-900 font-medium">Music</a>
            </>
          )}
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex items-center">
          {user ? (
            <div className="ml-3 relative">
              <div>
                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true" aria-expanded="false" onClick={() => logoutWithRedirect()}>
                  <img className="h-8 w-8 rounded-full" src={user.picture || "/profile_image.png"} alt="Profile" referrerPolicy="no-referrer" />
                </button>
              </div>
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</a>
                  <div className="border-t border-gray-100"></div>
                  <a href="#" onClick={() => logoutWithRedirect()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="ml-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition ease-in-out duration-150" onClick={() => loginWithRedirect()}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="-mr-2 flex items-center sm:hidden">
        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  </nav>
  );
};

export default NavBar;