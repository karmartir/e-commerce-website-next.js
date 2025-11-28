'use client'
import { useState, useEffect, useRef } from 'react';
import {usePathname, useSearchParams, useRouter} from 'next/navigation';
import { Input } from '../ui/input';

const AdminSearch = () => {
    const pathname = usePathname();
    const formActionUrl = pathname.includes('/admin/orders') 
    ? '/admin/orders' 
    : pathname.includes('/admin/users') 
        ? '/admin/users' 
        : '/admin/products' 
            

const searchParams = useSearchParams();
const router = useRouter();
const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');
const searchTimeout = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
    setQueryValue(searchParams.get('query') || '');
}, [searchParams]);

const handleSearch = (value: string) => {
  setQueryValue(value);

  if (searchTimeout.current) clearTimeout(searchTimeout.current);

  searchTimeout.current = setTimeout(() => {
    const params = new URLSearchParams();
    if (value) params.set('query', value);
    router.push(`${formActionUrl}?${params.toString()}`);
  }, 300);
};

return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSearch(queryValue);
    }}
  >
    <Input
      type="search"
      name="query"
      value={queryValue}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
      className="md:w-[100px] lg:w-[300px]"
    />
    <button className="sr-only" type="submit">Search</button>
  </form>
);
}
 
export default AdminSearch;