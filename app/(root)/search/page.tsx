import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import { getAllProducts, getAllCategories } from "@/lib/actions/product.actions";
import Link from "next/link";
import React from "react";


const prices = [
    {
        name: '$1 to $50',
        value: '1-50'
    },
    {
        name: '$51 to $100',
        value: '51-100'
    },
    {
        name: '$101 to $200',
        value: '101-200'
    },
    {
        name: '$201 to $500',
        value: '201-500'
    },
    {
        name: '$501 and above',
        value: '501-1000000'
    }
]

const ratings = [4, 3, 2, 1];

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

export async function generateMetadata(props: {
    searchParams: Promise<{
        q: string;
        category: string;
        price: string;
        rating: string;
    }>
}) {
    const {
        q = 'all',
        category = "all",
        price = "all",
        rating = "all",
    } = await props.searchParams;
    const isQuerySet = q && q !== 'all' && q.trim() !== '';
    const isCategorySet = category && category !== 'all' && category.trim() !== '';
    const isPriceSet = price && price !== 'all' && price.trim() !== '';
    const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

    if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
        return {
            title: `Search ${isQuerySet ? q : ''}
        ${isCategorySet ? `: Category ${category}` : ''}
        ${isPriceSet ? ` Price ${price}` : ''}
        ${isRatingSet ? ` Rating ${rating}` : ''}`,
        };
    } else {
        return {
            title: 'Search Products',
        };
    }
}

const SearchPage = async (props: {
    searchParams: Promise<{
        q?: string;
        category?: string;
        price?: string;
        rating?: string;
        sort?: string;
        page?: string;
    }>
}) => {
    const { q = 'all', category = 'all', price = 'all', rating = 'all', sort = 'newest', page = '1' } = await props.searchParams;

    // Construct the filter url

    /* const getFilterUrl = ({
        c,
        p,
        s,
        r,
        pg
    }: {
        c?: string;
        p?: string;
        s?: string;
        r?: string;
        pg?: string;
    }) => {
        const params = {q, category, price, rating, sort, page};
        
        if (c) params.category = c;
        if (p) params.price = p;
        if (s) params.sort = s;
        if (r) params.rating = r;
        if (pg) params.page = pg;

        return `/search?` + new URLSearchParams(params).toString();

    } */
    const getFilterUrl = ({
        c,
        p,
        s,
        r,
        pg
    }: {
        c?: string;
        p?: string;
        s?: string;
        r?: string;
        pg?: string;
    }) => {
        const params = {
            q,
            category,
            price,
            rating,
            sort,
            page
        };

        if (c) params.category = c;
        if (p) params.price = p;
        if (s) params.sort = s;
        if (r) params.rating = r;
        if (pg) params.page = pg;

        // manually encode each param so spaces become %20
        const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
            .join('&');

        return `/search?` + queryString;
    };

    const products = await getAllProducts({
        query: q,
        category,
        price,
        rating,
        sort,
        page: Number(page)
    });
    const categories = await getAllCategories();
    return (
        <div className="grid md:grid-cols-5 md:gap-5">
            <div className="filter-links">
                {/* {Category Links} */}
                <div className="text-xl mb-2 mt-3">Department</div>
                <div>
                    <ul className="space-y-1">
                        <li>
                            <Link className={`${(category === 'all' || category === '') && 'font-bold'}`}
                                href={getFilterUrl({ c: 'all' })}>
                                Any
                            </Link>
                        </li>
                        <hr className="border-t border-gray-300 my-1" />
                        {categories.map((cat, index) => (
                            <React.Fragment key={cat.category}>
                                <li>
                                    <Link className={`${category === cat.category && 'font-bold'}`}
                                        href={getFilterUrl({ c: cat.category })}>
                                        {cat.category}
                                    </Link>
                                </li>
                                {index !== categories.length - 1 && <hr className="border-t border-gray-300 my-1" />}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
                {/* {Price Links} */}
                <div className="text-xl mb-2 mt-8">Price</div>
                <div>
                    <ul className="space-y-1">
                        <li>
                            <Link className={`${price === 'all' && 'font-bold'}`}
                                href={getFilterUrl({ p: 'all' })}>
                                Any
                            </Link>
                        </li>
                        <hr className="border-t border-gray-300 my-1" />
                        {prices.map((priceOption, index) => (
                            <React.Fragment key={priceOption.value}>
                                <li>
                                    <Link className={`${price === priceOption.value && 'font-bold'}`}
                                        href={getFilterUrl({ p: priceOption.value })}>
                                        {priceOption.name}
                                    </Link>
                                </li>
                                {index !== prices.length - 1 && <hr className="border-t border-gray-300 my-1" />}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
                {/* {Rating Links} */}
                <div className="text-xl mb-2 mt-8">Customer Ratings</div>
                <div>
                    <ul className="space-y-1">
                        <li>
                            <Link className={`${rating === 'all' && 'font-bold'}`}
                                href={getFilterUrl({ r: 'all' })}>
                                Any
                            </Link>
                        </li>
                        <hr className="border-t border-gray-300 my-1" />
                        {ratings.map((r, index) => (
                            <React.Fragment key={r}>
                                <li>
                                    <Link className={`${rating === r.toString() && 'font-bold'}`}
                                        href={getFilterUrl({ r: `${r}` })}>
                                        {`${r} star${r === 1 ? '' : 's'} & up`}
                                    </Link>
                                </li>
                                {index !== ratings.length - 1 && <hr className="border-t border-gray-300 my-1" />}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="md:col-span-4 space-y-4">
                <div className="flex-between flex-col md:flex-row my-4">
                    <div className="flex items-center">
                        {q !== 'all' && q !== '' && 'Showing results for ' + q + '.'}
                        {category !== 'all' && category !== '' && ' Category: ' + category + '.'}
                        {price !== 'all' && price !== '' && ' Price: ' + price + '.'}
                        {rating !== 'all' && rating !== '' && ' Rating: ' + rating + ` star${rating === '1' ? '' : 's'} & up.`}
                        &nbsp;
                        {
                            (q !== 'all' && q !== '') ||
                                (category !== 'all' && category !== '') ||
                                (rating !== 'all') ||
                                (price !== 'all') ? (
                                <Button variant={"link"} asChild >
                                    <Link href="/search"> Clear</Link>
                                </Button>
                            ) : null}
                    </div>

                    <div>
                        {products.data.length} Result{products.data.length !== 1 && 's'}
                        {/* {sort} */}
                    </div>
                    <div>
                        Sort by {' '}
                        {sortOrders.map((s, index) => (
                            <React.Fragment key={s}>
                                <Link className={`${sort == s && 'font-bold'}`}
                                    href={getFilterUrl({ s })}>
                                    {s}
                                </Link>
                                {index !== sortOrders.length - 1 && <span className="px-2">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {products.data.length === 0 && (
                        <div>No products found</div>
                    )}
                    {products.data.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </div>
    )

}
export default SearchPage;