import React from "react";
import { Card } from "../ui/card";

type Props = React.PropsWithChildren<{}>;

const WrapperContainer = ({ children }: Props) => {
  return (
    <Card className="w-full h-[calc(100svh-32px)] lg:h-full p-2 f;ex flex-col gap-2">
      {children}
    </Card>
  );
};

export default WrapperContainer;