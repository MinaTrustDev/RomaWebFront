"use client";

import { VariationEntity } from '@/core/domain/entities/variants.entity'
import React, { Suspense, useEffect, useState } from 'react'
import { VariantSelector } from './details/variant-selector'
import AddonsSelector from './AddonsSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useProductConfigurationStore } from '../../stores/SelectedVariantsStore';

export default function VariationsConfiguration({ variations }: { variations: VariationEntity[] | undefined }) {
    if (!variations || variations?.length === 0) return null;


    const selectedVariant = useProductConfigurationStore((state) => state.selectedVariant);
    const setSelectedVariant = useProductConfigurationStore((state) => state.setSelectedVariant);

        useEffect(() => {
        if (variations[0]) {
            setSelectedVariant(variations[0]);
        }   
    }, [variations, setSelectedVariant]);


    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground px-2">
                خيارات المنتج
            </h3>

            <VariantSelector variants={variations} selectedVariant={selectedVariant} setSelectedVariant={(variant) => setSelectedVariant(variant)} />
            
            {selectedVariant && <Suspense fallback={<LoadingState />}>
                <AddonsSelector variantId={Number(selectedVariant.id)} />
            </Suspense>}
        </div>
    )
}

const LoadingState = () => {
    return <Card>
        <CardHeader>
            <CardTitle>
                جاري تحميل المنتجات
            </CardTitle>
        </CardHeader>
    <CardContent className='flex items-center justify-center'>
      <Spinner />
    </CardContent>
  </Card>;
}