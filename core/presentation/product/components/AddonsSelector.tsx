"use client";

import React, { useEffect, useState } from 'react'
import { AddonEntity, AddonOptionEntity } from '@/core/domain/entities/Addons.entity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getAddonsAction } from '../../actions/get-addons.actions';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { useProductConfigurationStore } from '../../stores/SelectedVariantsStore';

export default function AddonsSelector({ variantId }: { variantId: number }) {
  // const setAvailableAddons = useProductConfigurationStore((state) => state.setAvailableAddons);

  const { data: addons, isLoading } = useSuspenseQuery({
    queryKey: ['addons', variantId],
    queryFn: async () => {
      const [addons, addonsError] = await getAddonsAction({productId: variantId});
      return addons;
    },
  });

  if (!addons) return null;

  return (
    <div className='space-y-4'>
      {addons.sort((a: AddonEntity, b: AddonEntity) => a.options.reduce((acc, option) => acc + Number(option.price), 0) - b.options.reduce((acc, option) => acc + Number(option.price), 0)).map((addon: AddonEntity) => (
        <AddonCard key={addon.id} addon={addon} />
      ))}
    </div>
  )
}

const AddonCard = ({ addon }: { addon: AddonEntity }) => {
  const setAddonOptions = useProductConfigurationStore((state) => state.setAddonOptions);
  const [selectedOptions, setSelectedOptions] = useState<AddonOptionEntity[]>(
    addon.options.filter((option) => option.selected_by_default),
  );

  const handleSelectOption = (option: AddonOptionEntity) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o.title !== option.title));
    } 
    else if (!addon.IsMultiChoise) {
      setSelectedOptions([option]);
    }
    else if ((selectedOptions.length < addon.min_max_rules.max || addon.min_max_rules.max === 0)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    setAddonOptions(addon.id, selectedOptions);
  }, [selectedOptions]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <span>{addon.title}</span>
                    { addon.min_max_rules.max > 0 && <span>({selectedOptions.length} - {addon.min_max_rules.max})</span>}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {addon.options.map((option) => (
<AddonOptionCard 
              key={option.title} 
              option={option} 
              handleSelectOption={handleSelectOption} 
                            selected={selectedOptions.includes(option)} 

            />                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

const AddonOptionCard = ({ option, handleSelectOption, selected }: { option: AddonOptionEntity, handleSelectOption: (option: AddonOptionEntity) => void, selected: boolean }) => {
    return (
        <Item className={cn('border border-border rounded-md', selected && 'bg-primary text-white!')}>
            <ItemContent>
                <ItemTitle>
                  <span>{option.title}</span>
                  <span className='text-xs text-muted-foreground'>{option.tooltip}</span>
                </ItemTitle>
                <ItemDescription className={cn(selected && 'text-white!')}>
                  {option.price_method === "free" ? "مجانا" : `${option.price} ج.م`}
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button variant='outline' className={cn("cursor-pointer", selected && 'bg-white! text-primary!')} onClick={() => handleSelectOption(option)}>
                    {selected ? <Minus className='h-4 w-4' /> : <Plus className='h-4 w-4' />}
                </Button>
            </ItemActions>
        </Item>
    )
}