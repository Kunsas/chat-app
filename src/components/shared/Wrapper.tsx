import { Rows } from "lucide-react";
import React from "react";
import DesktopNavBar from "./navbar/DesktopNavBar";
import MobileNavBar from "./navbar/MobileNavBar";

type Props = React.PropsWithChildren<{}>;

const Wrapper = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen p-4 flex flex-col lg:flex-row gap-4">
      <MobileNavBar />
      <DesktopNavBar />
      <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
