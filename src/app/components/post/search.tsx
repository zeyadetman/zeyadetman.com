"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

export const SearchPostsInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((val: string) => {
      router.push(pathname + "?" + createQueryString("q", val));
    }, 300),
    [createQueryString, pathname, router]
  );

  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="grow input-sm"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          debouncedUpdate(e.target.value);
        }}
      />

      <MagnifyingGlass />
    </label>
  );
};
