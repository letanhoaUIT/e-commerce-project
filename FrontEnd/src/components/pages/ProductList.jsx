import React, { useEffect, useState } from 'react';
import Axios from '../../constants/Axios';
import { Link, useLocation } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const query = new URLSearchParams(useLocation().search);
    const search = query.get('search') || '';
    const category = query.get('category') || '';
    const sort = query.get('sort') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const [productsResponse, variantCountsResponse] = await Promise.all([
                    Axios.get('/products', {
                        params: { search, category, sort }
                    }),
                    Axios.get('/products-with-variant-count')
                ]);

                const productsData = productsResponse.data;
                const variantCounts = variantCountsResponse.data;

                const variantCountMap = variantCounts.reduce((map, product) => {
                    map[product.id] = product.variants_count;
                    return map;
                }, {});

                // Kết hợp số lượng biến thể vào dữ liệu sản phẩm
                const productsWithVariantCount = productsData.map(product => ({
                    ...product,
                    variants_count: variantCountMap[product.id] || 0
                }));

                setProducts(productsWithVariantCount);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch products or variant counts');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, category, sort]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="ml-2 text-3xl font-bold">
                    MEN'S - DRESS SHOES
                </h1>
            </div>

            {/* Product list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className="p-2 rounded flex flex-col">
                        <img src={product.image_url} alt={product.name} className="w-full object-cover mb-4 cursor-pointer" />
                        <div className="w-full flex justify-between items-center cursor-pointer">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-500">MEN'S SHOES</p>
                                <h2 className="text-lg font-bold">{product.name}</h2>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-gray-500">{product.variants_count} COLORS</p>
                                <button className="text-sm font-semibold">ADD +</button>
                            </div>
                        </div>
                        <p className="text-lg mt-4">${product.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
