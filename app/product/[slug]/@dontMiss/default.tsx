import ProductCardById from '@/components/common/ProductCardById';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDontMissAction } from '@/core/presentation/actions/get-dont-miss.action';
import React, { Suspense } from 'react'

export default async function DontMissDefault() {
    const [dontMissProducts, dontMissError]  = await getDontMissAction();
    
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Don't Miss
            </CardTitle>
        </CardHeader>
        <CardContent className=''>
            <div className="flex gap-5 justify-around flex-wrap">
        {dontMissProducts.map((productId: number) => (
            <Suspense key={productId} fallback={<div>Loading...</div>}>
                <ProductCardById key={productId} productId={productId} />
            </Suspense>
            ))}
            </div>
        </CardContent>
    </Card>
  )
}
