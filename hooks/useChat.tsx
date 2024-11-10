import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useChat = () => {
  const params = useParams();

  const chatId = useMemo(
    () =>
      Array.isArray(params?.chatId) ? params.chatId[0] : params?.chatId || "",
    [params?.chatId]
  );

  const isActive = useMemo(() => !!chatId, [chatId]);

  return {
    isActive,
    chatId,
  };
};
