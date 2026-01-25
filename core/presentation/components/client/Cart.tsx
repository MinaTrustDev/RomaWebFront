'use client'

import { Button } from '@/components/ui/button'
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from '@/components/ui/drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { CartEntity } from '@/core/domain/entities/Cart.entity'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCartAction } from '../../actions/get-cart.action'
import { CartItemEntity } from '@/core/domain/entities/CartItem.entity'
import { ShoppingCart, Plus, Minus, Trash2, Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const getCartItems = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const [cart, cartError] = await getCartAction();
      if (cartError) {
        throw cartError;
      }
      return cart;
    },
    refetchOnWindowFocus: true,
  })
}

export default function Cart() {
  const { data: cart, isLoading, error } = getCartItems();

  const formatPrice = (price: string | number | undefined) => {
    if (!price) return '0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toFixed(2);
  };

  return (
    <>
      {/* Floating Cart Button - Always visible at bottom right */}
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button 
            variant="default" 
            size="icon" 
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl shadow-primary/50 hover:shadow-primary/70 hover:scale-110 transition-all duration-300"
          >
            <ShoppingCart className="size-5" />
            {cart && cart.totalItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold"
              >
                {cart.totalItems}
              </Badge>
            )}
          </Button>
        </DrawerTrigger>
      
      <DrawerContent className="max-h-[96vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-2xl font-bold">سلة التسوق</DrawerTitle>
              <DrawerDescription className="mt-1">
                {cart ? `${cart.totalItems} منتج في السلة` : 'السلة فارغة'}
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="size-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-20 w-20 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-destructive/10 p-4 mb-4">
                <X className="size-8 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2">حدث خطأ</h3>
              <p className="text-muted-foreground text-sm">
                {error instanceof Error ? error.message : 'فشل تحميل السلة'}
              </p>
            </div>
          ) : !cart || cart.cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <ShoppingCart className="size-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">السلة فارغة</h3>
              <p className="text-muted-foreground text-sm">
                أضف منتجات إلى سلة التسوق لبدء الشراء
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cart.cartItems.map((item: CartItemEntity) => {
                  const productName = item.productNameAr || item.productNameEn || item.productName || `منتج #${item.productId}`;
                  
                  return (
                    <Card key={item.productId} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={productName}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 bg-muted/20">
                                <ShoppingCart className="size-6" />
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-2 leading-tight">
                                  {productName}
                                </h3>
                                {item.addons && item.addons.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    <p className="text-xs text-muted-foreground font-medium">
                                      الإضافات:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {item.addons.map((addon) => (
                                        <Badge 
                                          key={addon.addonId} 
                                          variant="secondary" 
                                          className="text-xs"
                                        >
                                          {addon.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Quantity and Price */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">الكمية:</span>
                                <Badge variant="outline" className="font-mono">
                                  {item.quantity}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-col items-end gap-1">
                                {item.total && (
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-primary">
                                      {formatPrice(item.total)}
                                    </span>
                                    <span className="text-xs text-muted-foreground">ج.م</span>
                                  </div>
                                )}
                                {item.points && parseFloat(item.points) > 0 && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Sparkles className="size-3 text-yellow-500" />
                                    <span>{formatPrice(item.points)} نقطة</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Cart Summary */}
              <Separator className="my-4" />
              <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">عدد المنتجات:</span>
                    <span className="font-semibold">{cart.totalItems}</span>
                  </div>
                  
                  {cart.totalPrice && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">المجموع الفرعي:</span>
                      <span className="font-semibold">
                        {formatPrice(cart.totalPrice)} ج.م
                      </span>
                    </div>
                  )}

                  {cart.VAT && parseFloat(cart.VAT) > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">الضريبة:</span>
                      <span className="font-semibold">
                        {formatPrice(cart.VAT)} ج.م
                      </span>
                    </div>
                  )}

                  <Separator />
                  
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold">الإجمالي:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary">
                        {formatPrice(cart.totalPriceWithTax || cart.totalPrice)}
                      </span>
                      <span className="text-sm text-muted-foreground">ج.م</span>
                    </div>
                  </div>

                  {cart.totalPoints && parseFloat(cart.totalPoints) > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-yellow-500" />
                        <span className="text-sm font-medium">النقاط المكتسبة:</span>
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {formatPrice(cart.totalPoints)} نقطة
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {cart && cart.cartItems.length > 0 && (
          <DrawerFooter className="border-t bg-background">
            <div className="flex gap-3">
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  متابعة التسوق
                </Button>
              </DrawerClose>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-lg font-bold h-12">
                إتمام الطلب
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
      </Drawer>
    </>
  )
}
