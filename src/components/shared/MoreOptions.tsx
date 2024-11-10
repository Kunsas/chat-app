import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Eye, Trash2, User } from "lucide-react";

type Props = {
  chatId: string;
  onOptionSelect: React.Dispatch<React.SetStateAction<string>>;
  setChatIdToDelete: React.Dispatch<React.SetStateAction<string>>;
  setChatIdToRead: React.Dispatch<React.SetStateAction<string>>;
};

const MoreOptions = ({
  chatId,
  onOptionSelect,
  setChatIdToRead,
  setChatIdToDelete,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  React.useEffect(() => {
    if (selectedOption === "Delete") {
      onOptionSelect(selectedOption);
      setChatIdToDelete(chatId);
    } else if (selectedOption === "Mark as read") {
      onOptionSelect(selectedOption);
      setChatIdToRead(chatId);
    }
  }, [selectedOption, chatId, setChatIdToDelete, setChatIdToRead]);

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <OptionList
            chatId={chatId}
            setOpen={setOpen}
            setSelectedOption={setSelectedOption}
            setChatIdToDelete={setChatIdToDelete}
            setChatIdToRead={setChatIdToRead}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MoreOptions;

function OptionList({
  chatId,
  setOpen,
  setSelectedOption,
  setChatIdToDelete,
  setChatIdToRead,
}: {
  chatId: string;
  setOpen: (open: boolean) => void;
  setSelectedOption: (selectedOption: string) => void;
  setChatIdToDelete: React.Dispatch<React.SetStateAction<string>>;
  setChatIdToRead: React.Dispatch<React.SetStateAction<string>>;
}) {
  const options: string[] = ["Mark as read", "Delete"];
  return (
    <Command>
      <CommandList className="p-2">
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option}
              value={option}
              onSelect={(value: string) => {
                if (value === "Delete") {
                  setSelectedOption("Delete");
                  setChatIdToDelete(chatId);
                } else if (value == "Mark as read") {
                  setSelectedOption("Mark as read");
                  setChatIdToRead(chatId);
                }
                setOpen(false);
              }}
            >
              {option}
              {option === "Mark as read" ? <Eye /> : <Trash2 />}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
