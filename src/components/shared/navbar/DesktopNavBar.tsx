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
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { User, users } from "@/app/data/users";

const DesktopNavBar = () => {
  const paths = useNavigation();
  const user: User = users[0];
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
        {/* <UserCircle /> */}
        <ThemeToggle />
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.username}</AvatarFallback>
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
      </div>
    </Card>
  );
};

export default DesktopNavBar;
