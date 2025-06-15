import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { DEBOUNCE_TIME } from "@/lib/constants";

export default function SearchForm() {
  const { q } = useLoaderData() as { q: string | null };
  const [query, setQuery] = useState(q || "");
  const navigation = useNavigation();
  const submit = useSubmit();

  const formRef = useRef<HTMLFormElement>(null);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    setQuery(q || "");
  }, [q]);

  // Debounce submit using useRef
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (formRef.current) {
        const isFirstSearch = q === null;
        submit(formRef.current, { replace: !isFirstSearch });
      }
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timerId);
  }, [query, submit, q]);

  function handleSearchChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setQuery(ev.target.value);
  }

  return (
    <Form
      role="search"
      id="search-form"
      aria-busy={searching}
      className="relative w-full max-w-3xl md:max-w-3xs"
      ref={formRef}
    >
      <Input
        type="search"
        name="q"
        id="q"
        aria-label="Search products"
        placeholder="Search products"
        value={query}
        onChange={handleSearchChange}
        className="rounded-sm pl-7 text-sm font-normal"
      />

      {/* Search Icon */}
      <div
        className="absolute top-1/2 left-2 -translate-y-1/2"
        hidden={searching}
      >
        <Search className="text-muted-foreground size-4" />
      </div>

      {/* Search Spinner */}
      <div
        id="search-spinner"
        role="status"
        aria-hidden="true"
        hidden={!searching}
        className="border-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2 animate-spin rounded-full border border-t-transparent"
      />

      {/* Accessible search status */}
      <div className="sr-only" aria-live="polite">
        {searching ? "Searching products" : ""}
      </div>
    </Form>
  );
}
