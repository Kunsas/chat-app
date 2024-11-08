import { Card } from "@/components/ui/card";
import React, { useRef, useState } from "react";
import { z } from "zod";
import { useChat } from "../../../../../../hooks/useChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Message } from "@/app/data/messages";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const { chatId } = useChat();

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;
    if (selectionStart !== null) {
      form.setValue("content", value);
    }
  };

  const handleSend = async (values: z.infer<typeof chatMessageSchema>) => {
    // add message to the messages array
    form.reset();
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          ,
          <form
            onSubmit={form.handleSubmit(handleSend)}
            className="flex gap-2 items-end w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <TextareaAutosize
                        rows={1}
                        maxRows={8}
                        {...field}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await form.handleSubmit(handleSend)();
                          }
                        }}
                        placeholder="Type a message..."
                        className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
