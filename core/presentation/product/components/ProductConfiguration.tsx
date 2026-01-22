"use client";

import { AddonEntity } from '@/core/domain/entities/Addons.entity';
import { VariationEntity } from '@/core/domain/entities/variants.entity';
import React, { useMemo, useState } from 'react'
import { ProductStructuredData } from './product-structured-data';
import { ProductEntity } from '@/core/domain/entities/product.entity';
import { ProductBackButton } from './ProductBackButton';
import { ProductImage } from './details/product-image';
import VariationsConfiguration from './VariationsConfiguration';
import { AddToCart } from './details/add-to-cart';
import { ProductHeader } from './details/product-header';
import { PriceDisplay } from './details/price-display';
import { useProductConfigurationStore } from '../../stores/SelectedVariantsStore';


export default function ProductConfiguration({ variations, product }: { variations: VariationEntity[], product: ProductEntity }) {
  const totalPrice = useProductConfigurationStore((state) => {
        const variantPrice = state.selectedVariant?.price_tax || 0;
        const addonPrice = Object.values(state.selectedAddons).reduce((total, options) => {
            return total + options.reduce((sum, opt) => {
                return sum + (opt.price_method !== 'free' ? Number(opt.price) || 0 : 0);
            }, 0);
        }, 0);
        return variantPrice + addonPrice;
    });
  
  return (
    <>
      <ProductStructuredData product={product} />
      <div className="relative min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <ProductBackButton />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 flex flex-col gap-10">
              <ProductImage
                image={product.image}
                name={product.name_ar}
                stockStatus={product.stock_status}
                points={product.points}
              />
              <VariationsConfiguration  variations={variations} />

              <div className="md:hidden sticky bottom-0 bg-background p-4 pt-0 w-full border border-primary rounded-t-md">
                <AddToCart
                  disabled={product.stock_status !== "instock"}
                  price={totalPrice}
                  points={product.points}
                  productId={product.id}
                />
              </div>
            </div>
            <div className="hidden lg:col-span-5 md:flex flex-col space-y-8 md:space-y-10 sticky top-8">
                <ProductHeader
                  name={product.name_ar}
                  description={product.description_ar}
                />

                <div className="space-y-8 p-8 rounded-[2rem] border border-primary/5 shadow-2xl shadow-primary/5">
                  <PriceDisplay price={totalPrice} priceTax={totalPrice} />

                  <AddToCart
                    disabled={product.stock_status !== "instock"}
                    price={totalPrice}
                    points={product.points}
                    productId={product.id}
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
