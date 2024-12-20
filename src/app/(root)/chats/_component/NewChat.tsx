"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "../../../../../hooks/useMediaQuery";
import { Plus } from "lucide-react";
import { User } from "@/app/store/types";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  onNewChat: React.Dispatch<React.SetStateAction<User | null>>;
};

export function NewChat({ onNewChat }: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedUser, setSelectedUser] = React.useState<User>();

  React.useEffect(() => {
    if (selectedUser) {
      onNewChat(selectedUser);
    }
  }, [selectedUser, onNewChat]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" variant={"outline"}>
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <UserList setOpen={setOpen} setSelectedUser={setSelectedUser} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" variant={"outline"}>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="ml-4">New Chat</DrawerTitle>
        <div className="mt-4 border-t">
          <UserList setOpen={setOpen} setSelectedUser={setSelectedUser} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function UserList({
  setOpen,
  setSelectedUser,
}: {
  setOpen: (open: boolean) => void;
  setSelectedUser: (user: User) => void;
}) {
  const users = useAppSelector((state) => state.users.users);
  return (
    <Command>
      <CommandInput placeholder="Search username" />
      <CommandList className="p-2">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {users.map((user) => (
            <CommandItem
              key={user.userId}
              value={user.username}
              onSelect={(value) => {
                const user = users.find((user) => user.username === value);
                if (user) {
                  setSelectedUser(user);
                  setOpen(false);
                }
              }}
            >
              <Avatar>
                <AvatarImage
                  src={
                    user.image === "group"
                      ? user.username.substring(0, 1)
                      : "/" + user.image
                  }
                  alt={user.username.substring(0, 1)}
                  className="rounded-full"
                />
                <AvatarFallback>{user.username.substring(0, 1)}</AvatarFallback>
              </Avatar>
              {user.username}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
