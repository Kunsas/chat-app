import { Blend, MessageCircle, UsersRoundIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();

  const paths = useMemo(
    () => [
      {
        name: "Teams",
        href: "/",
        icon: <Blend />,
        active: pathname == "/",
      },
      {
        name: "Chats",
        href: "/chats",
        icon: <MessageCircle />,
        active: pathname.startsWith("/chats"),
      },
      {
        name: "Community",
        href: "/community",
        icon: <UsersRoundIcon />,
        active: pathname == "/community",
      },
    ],
    [pathname]
  );

  return paths;
};
