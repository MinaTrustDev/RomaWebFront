import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { cn } from '@/lib/utils';

export function BranchListItemSkeleton() {
  return (
    <Item
      variant="outline"
      className="justify-center items-center pointer-events-none"
    >
      <ItemMedia className="relative items-center justify-center">
        <div className="w-[50px] h-[50px] rounded-sm bg-muted/20 animate-pulse" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-md font-bold">
          <div className="h-5 w-32 bg-muted/20 rounded animate-pulse" />
        </ItemTitle>
        <ItemDescription className="text-xs text-muted-foreground">
          <div className="h-4 w-48 bg-muted/20 rounded animate-pulse mt-1" />
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

