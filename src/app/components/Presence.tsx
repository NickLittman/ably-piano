"use client";

import React, { useEffect } from "react";
import { usePresence } from "@ably-labs/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";

export default function Presence() {
  const [presenceData, updateStatus] = usePresence("piano");
  const { user } = useAuth0();

  if (!user) throw new Error("no user");

  useEffect(() => {
    console.log("updateStatus firing")
    updateStatus({ action: "enter", data: {name: user.name, picture: user.picture }});
  }, [user]);

  useEffect(() => {
    console.log("presenceData firing")
    presenceData.forEach((member) => {
      console.log(member);
    }
    );
  }, [presenceData]);

  return (
    <div className="flex mb-5 -space-x-4">
        {presenceData.map((member, index) => (
            <Image key={index} src={member.data.data.picture || "/profile_image.png"} alt="Profile" width={50} height={50} className="w-30 h-30 border-2 border-white rounded-full dark:border-gray-800" referrerPolicy="no-referrer" />
        ))}
        <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
    </div>
  );
}
