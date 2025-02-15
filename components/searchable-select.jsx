"use client";

import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SearchableSelect = ({
  changeValue,
  defaultValue,
  api,
  keyValue,
  query,
  placeholder,
  defaultInputValue,
  searchable,
  removable,
  showItems,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || "");
  const [searchState, setSearchState] = useState(
    searchable ? defaultInputValue || "" : "",
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (searchable || data.length === 0) {
      setIsLoading(true);
      let timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchData();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [searchState]);

  const fetchData = async () => {
    const currentValueObj = data.find((item) => String(item.id) === value);

    try {
      const res = await api({ page: 1, perPage: 10, [query]: searchState });

      const newData =
        showItems && Array.isArray(showItems)
          ? res?.data?.data.map((item) => ({
              ...item,
              showItems: showItems.map((i) => item?.[i]).join(""),
            }))
          : res.data.data;

      const checkCurrentValueObj = newData.find(
        (item) => String(item?.id) === String(currentValueObj?.id),
      );

      setData(
        Array.isArray(newData)
          ? showItems && currentValueObj && !checkCurrentValueObj
            ? [...newData, currentValueObj]
            : newData
          : [],
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between px-1.5"
        >
          <span className="flex items-center gap-1.5 text-sm font-normal">
            {removable && (
              <X
                size={14}
                strokeWidth={1.5}
                onClick={(e) => {
                  setValue("");
                  changeValue("");
                  e.preventDefault();
                }}
              />
            )}

            {value
              ? showItems
                ? showItems.map((item, index) => (
                    <span key={index}>
                      {data.find((item) => item[keyValue] === value)?.[item]}
                      {index + 1 !== showItems.length && ` - `}
                    </span>
                  ))
                : data.find((item) => item[keyValue] === value)?.title ||
                  data.find((item) => item[keyValue] === value)?.name
              : placeholder || "انتخاب کنید..."}
          </span>

          <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput
            placeholder="جستجو..."
            value={searchState}
            onValueChange={(e) => {
              setSearchState(e);
            }}
          />

          <CommandList className={cn(isLoading && "overflow-hidden")}>
            {isLoading ? (
              <div className="flex items-center justify-center p-3 text-sm">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              <>
                <CommandEmpty>داده ای وجود ندارد</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item[keyValue]}
                      value={
                        showItems
                          ? item["showItems"]
                          : item["title"] || item["name"]
                      }
                      onSelect={(e) => {
                        setValue(item[keyValue]);
                        changeValue(item[keyValue]);
                        setOpen(false);
                      }}
                      className={cn(value === item[keyValue] && "bg-muted")}
                    >
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          value === item[keyValue]
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {showItems && Array.isArray(showItems) ? (
                        showItems.map((i, index) => (
                          <span key={index} className="px-1">
                            {item?.[i]}{" "}
                            {index + 1 !== showItems.length && ` - `}
                          </span>
                        ))
                      ) : (
                        <span>{item?.title || item?.name}</span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableSelect;
