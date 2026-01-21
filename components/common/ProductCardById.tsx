'use client';

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getProductByIdAction } from '@/core/presentation/actions/get-product-by-id.action'
import { ProductCard } from './product-card'


const getProductById = (productId: number) => {
    return useSuspenseQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const [product, error ]= await getProductByIdAction({productId: productId});
            return product;
        }
    })
}

export default function ProductCardById({productId}: {productId: number}) {
    const { data: product } = getProductById(productId);
  return (
    <Card className="flex-1 max-w-sm">
        <CardHeader>
            <CardTitle>ProductCardById</CardTitle>
        </CardHeader>
        <CardContent>
            <ProductCard product={product} />
        </CardContent>
    </Card>
  )
}
