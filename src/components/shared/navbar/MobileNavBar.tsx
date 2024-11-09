"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import { useNavigation } from "../../../../hooks/useNavigation";
import { Tooltip } from "@/components/ui/tooltip";
import Link from "next/link";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "../../../../hooks/useChat";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { User, users } from "@/app/data/users";

const MobileNavBar = () => {
  const { isActive } = useChat();

  const paths = useNavigation();

  const user: User = users[0];

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
          <ThemeToggle />
          {/* <UserCircle /> */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.username.substring(0, 1)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-center space-x-1">
                <Avatar>
                  <AvatarImage src={user.image} />
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
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNavBar;
