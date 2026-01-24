import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function BranchListItemSkeleton() {
  return (
    <Item
      variant="outline"
      className="justify-center items-center pointer-events-none"
    >
      <ItemMedia className="relative items-center justify-center">
        <Skeleton className="w-[50px] h-[50px] rounded-sm" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-md font-bold">
          <Skeleton className="h-5 w-32 rounded" />
        </ItemTitle>
        <ItemDescription className="text-xs text-muted-foreground">
          <Skeleton className="h-4 w-48 rounded mt-1" />
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

