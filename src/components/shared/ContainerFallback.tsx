import React from "react";
import { Card } from "../ui/card";

const ContainerFallback = () => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 items-center justify-center"  style={{ backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))'}}>
      Select a participant / start a new chat to get started!
    </Card>
  );
};

export default ContainerFallback;
