import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getProductByIdAction } from '@/core/presentation/actions/get-product-by-id.action'
import { ProductCard } from './product-card'


export default async function ProductCardById({productId}: {productId: number}) {
    const [product, productError] = await getProductByIdAction({productId: productId});
  return (
    <Card className="flex-1 max-w-sm pt-5">
        <CardContent>
            <ProductCard product={product} />
        </CardContent>
    </Card>
  )
}
