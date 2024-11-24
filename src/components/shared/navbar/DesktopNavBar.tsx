"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useNavigation } from "../../../../hooks/useNavigation";
import { Tooltip } from "@/components/ui/tooltip";
import Link from "next/link";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { CircleUserRound, LogOut, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ThemeToggler } from "../ThemeToggler";
import { UserDetailsResponse } from "@/app/api/models/apiRequests";

const DesktopNavBar = () => {
  const [user, setUser] = useState<UserDetailsResponse>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.userDetails) {
          setUser(data.userDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const paths = useNavigation();
  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                      >
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggler />
        {user === undefined ? (
          <div className="flex w-10 h-10 items-center justify-center">
            <CircleUserRound strokeWidth="1" size="30" />
          </div>
        ) : (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {user!.username.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-48 m-4">
              <div className="flex justify-center space-x-1">
                <Avatar>
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{user.username}</h4>
                  <p className="text-sm">{user.email}</p>
                  <div className="flex items-center pt-2">
                    <Button variant="link">
                      Sign Out <LogOut />
                    </Button>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    </Card>
  );
};

export default DesktopNavBar;
