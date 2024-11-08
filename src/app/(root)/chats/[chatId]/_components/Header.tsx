import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  image?: string;
  name: string;
};

const Header = ({ image, name }: Props) => {
  return (
    <Card className="w-full flex rounded-lg items-center p-2 justify-between">
      <div className="flex items-center gap-2">
        <Link href="/chats" className="block lg:hidden">
          <ChevronLeft />
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarImage src={"/" + image}
            alt={name.substring(0, 1)} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
    </Card>
  );
};

export default Header;
