"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { Tooltip } from "@/components/ui/tooltip";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { CircleUserRound, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { useChat } from "../../../../hooks/useChat";
import { useNavigation } from "../../../../hooks/useNavigation";
import { ThemeToggler } from "../ThemeToggler";
import { useEffect, useState } from "react";
import { UserDetailsResponse } from "@/app/api/models/apiRequests";

const MobileNavBar = () => {
  const { isActive } = useChat();

  const paths = useNavigation();

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

  if (isActive) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
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
          <ThemeToggler />
          {user === undefined ? (
            <div className="flex w-10 h-10 items-center justify-center">
              <CircleUserRound strokeWidth="1" size="30" />
            </div>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>
                    {user!.username.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="w-48">
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
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNavBar;
