import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "./ui/command"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  {
    value: string[]
    onChange: (value: string[]) => void
    options: { id: string; name: string }[]
  }
>(({ value, onChange, options, ...props }, ref) => {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (userId: string) => {
    const newValue = value.includes(userId)
      ? value.filter(id => id !== userId)
      : [...value, userId]
    onChange(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          ref={ref}
          {...props}
        >
          {value.length > 0
            ? `${value.length} usuario${
                value.length !== 1 ? "s" : ""
              } seleccionado${value.length !== 1 ? "s" : ""}`
            : "Seleccionar usuarios"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar usuario..." />
          <CommandList>
            <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
            <CommandGroup>
              {options.map(user => (
                <CommandItem
                  key={user.id}
                  onSelect={() => handleSelect(user.id)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(user.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})
MultiSelect.displayName = "MultiSelect"
