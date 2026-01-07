# Component Tree & Structure

## 🌳 Complete Component Hierarchy

```
app/
│
├── layout.tsx (Root Layout)
│   ├── Metadata (SEO)
│   ├── Fonts (Geist Sans, Geist Mono)
│   └── Children
│
├── page.tsx (Home Page - Server Component)
│   ├── MethodHeader (Client)
│   │   ├── DeliveryMethodTabs (Client)
│   │   └── [Clickable - redirects to method selection]
│   │
│   ├── OrderFlowManager (Client)
│   │   ├── MethodSelectorDialog (Client)
│   │   │   └── Button × 3 (dine-in, pickup, delivery)
│   │   │
│   │   ├── BranchSelectorDialog (Client)
│   │   │   ├── BranchList (Client)
│   │   │   │   └── BranchItem × N (Client)
│   │   │   ├── LoadingState (Client)
│   │   │   ├── EmptyState (Client)
│   │   │   └── Button (Continue)
│   │   │
│   │   └── SelectDeliveryLocation (Client)
│   │       └── MapSelector (Client)
│   │           └── GoogleMap
│   │
│   ├── MethodSelectionPage (Client) [if no branchId]
│   │   ├── DeliveryMethodTabs (Client)
│   │   └── OrderFlowManager (wraps Continue button)
│   │
│   └── BranchItems (Server) [if branchId exists]
│       ├── StructuredData (Client)
│       ├── BranchHeader (Client) [Clickable]
│       └── ProductSlider × N (Client)
│           ├── SectionHeader (Client)
│           └── ProductCard × N (Client)
│               ├── Image (Next.js)
│               ├── Badge (Stock Status)
│               └── Button (Add to Cart)
│
└── product/[id]/page.tsx (Product Detail - Server)
    ├── ProductStructuredData (Client)
    └── ProductDetail (Client)
        ├── Button (Back)
        ├── Image (Next.js)
        ├── Badge (Stock Status)
        ├── Card (Variant Selection)
        │   └── Button × N (Variants)
        └── Button (Add to Cart)
```

---

## 📊 Component Relationships

### Layer 1: Pages (App Router)

```
app/page.tsx
├── Server Component
├── Reads: cookies (branch_id)
├── Conditionally renders:
│   ├── MethodSelectionPage (no branch)
│   └── BranchItems (has branch)
└── Always renders:
    ├── MethodHeader
    └── OrderFlowManager
```

### Layer 2: Feature Components (Presentation)

```
MethodSelectionPage
├── Purpose: Entry point for method selection
├── State: Uses Zustand (deliveryMethod)
├── Children:
│   ├── DeliveryMethodTabs
│   └── OrderFlowManager (wraps Continue button)
└── Flow: User selects method → Continue → OrderFlowManager

OrderFlowManager
├── Purpose: Orchestrates entire order flow
├── State: Multiple useState hooks
├── Manages: 3 dialogs (method, branch, map)
├── Fetches: Branches via server actions
└── Flow: Method → Location (if delivery) → Branch → Products

BranchItems
├── Purpose: Display branch products
├── Type: Server Component
├── Fetches: Branch data via server action
├── Renders: ProductSlider for each category
└── Includes: SEO structured data
```

### Layer 3: Reusable Components (Common)

```
ProductCard
├── Purpose: Display single product
├── Props: ProductCardData
├── Features: Image, price, stock, add to cart
└── Used by: ProductSlider

BranchList
├── Purpose: Display branch selection list
├── Props: BranchDTO[], selectedBranch, onSelect
└── Used by: BranchSelectorDialog

BranchSelectorDialog
├── Purpose: Modal for branch selection
├── Features: Loading, error, empty states
├── Children: BranchList, LoadingState, EmptyState
└── Used by: OrderFlowManager
```

---

## 🔗 Component Dependency Map

```mermaid
graph TB
    subgraph "Pages"
        P1[app/page.tsx]
        P2[app/product/[id]/page.tsx]
    end

    subgraph "Presentation - Home"
        H1[MethodSelectionPage]
        H2[OrderFlowManager]
        H3[BranchItems]
        H4[MethodHeader]
        H5[BranchHeader]
        H6[DeliveryMethodTabs]
        H7[ProductSlider]
    end

    subgraph "Presentation - Product"
        PR1[ProductDetail]
        PR2[ProductStructuredData]
    end

    subgraph "Common Components"
        C1[ProductCard]
        C2[BranchList]
        C3[BranchSelectorDialog]
        C4[MethodSelectorDialog]
        C5[MapSelector]
        C6[SectionHeader]
        C7[LoadingState]
        C8[EmptyState]
    end

    subgraph "UI Primitives"
        U1[Button]
        U2[Card]
        U3[Dialog]
        U4[Tabs]
        U5[Badge]
    end

    P1 --> H1
    P1 --> H2
    P1 --> H3
    P1 --> H4

    H1 --> H6
    H1 --> H2

    H2 --> C3
    H2 --> C4
    H2 --> C5

    H3 --> H5
    H3 --> H7
    H3 --> PR2

    H7 --> C1
    H7 --> C6

    C1 --> U1
    C1 --> U2
    C1 --> U5

    C2 --> H8[BranchItem]

    C3 --> C2
    C3 --> C7
    C3 --> C8
    C3 --> U3

    C4 --> U3
    C4 --> U1

    C5 --> U3
    C5 --> U1

    P2 --> PR1
    P2 --> PR2

    PR1 --> U1
    PR1 --> U2
    PR1 --> U5
```

---

## 📐 Component Composition Patterns

### Pattern 1: Container + Presentational

```
OrderFlowManager (Container)
├── Manages state & logic
├── Handles data fetching
└── Renders:
    ├── MethodSelectorDialog (Presentational)
    ├── BranchSelectorDialog (Presentational)
    └── SelectDeliveryLocation (Presentational)
```

### Pattern 2: Server + Client Split

```
BranchItems (Server)
├── Fetches data server-side
├── Converts Entity → DTO
└── Renders:
    ├── StructuredData (Client - SEO)
    ├── BranchHeader (Client - Interactive)
    └── ProductSlider (Client - Interactive)
```

### Pattern 3: Compound Components

```
Dialog (Compound)
├── DialogTrigger
├── DialogContent
│   ├── DialogHeader
│   │   ├── DialogTitle
│   │   └── DialogDescription
│   ├── DialogBody
│   └── DialogFooter
```

---

## 🎯 Component Responsibilities Matrix

| Component                | Type   | State    | Side Effects   | Reusability |
| ------------------------ | ------ | -------- | -------------- | ----------- |
| **Button**               | Client | None     | onClick        | High        |
| **Card**                 | Client | None     | None           | High        |
| **Dialog**               | Client | Internal | Portal         | High        |
| **ProductCard**          | Client | None     | Navigation     | Medium      |
| **BranchList**           | Client | None     | Selection      | Medium      |
| **BranchSelectorDialog** | Client | Local    | Fetch branches | Low         |
| **OrderFlowManager**     | Client | Multiple | Fetch, cookies | Low         |
| **BranchItems**          | Server | None     | Fetch data     | Low         |
| **ProductSlider**        | Client | Carousel | None           | Medium      |

---

## 🔄 Data Flow Through Components

### Example: Selecting a Branch

```
1. User clicks "Continue" in MethodSelectionPage
   ↓
2. OrderFlowManager.handleContinue()
   ↓
3. Opens BranchSelectorDialog
   ↓
4. BranchSelectorDialog fetches branches via getBranches()
   ↓
5. getBranches() → GetBranchesUseCase → BranchRepository → API
   ↓
6. API returns data → Repository transforms to BranchEntity
   ↓
7. UseCase converts Entity → BranchDTO
   ↓
8. Server action caches and returns BranchDTO[]
   ↓
9. BranchSelectorDialog receives BranchDTO[]
   ↓
10. Renders BranchList with BranchItem components
    ↓
11. User selects branch → BranchItem onClick
    ↓
12. BranchSelectorDialog.onBranchSelect()
    ↓
13. User clicks Continue → OrderFlowManager.handleBranchContinue()
    ↓
14. Sets cookie, updates store, refreshes page
    ↓
15. app/page.tsx detects branchId cookie
    ↓
16. Renders BranchItems instead of MethodSelectionPage
    ↓
17. BranchItems fetches branch products
    ↓
18. Renders ProductSlider components
```

---

## 🧩 Component Props Interface

### Common Props Patterns

#### Dialog Components

```typescript
{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: () => void;
  loading?: boolean;
  error?: string | null;
}
```

#### List Components

```typescript
{
  items: T[];
  selectedItem: T | null;
  onSelect: (item: T) => void;
}
```

#### Display Components

```typescript
{
  data: DataType;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}
```

#### Form/Input Components

```typescript
{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
```

---

## 🎨 Styling Architecture

### Component Styling Layers

```
1. Base Styles (Tailwind)
   └── Utility classes

2. Component Variants (CVA)
   └── buttonVariants, badgeVariants

3. Theme Variables (CSS)
   └── --primary, --background, etc.

4. Component-Specific Styles
   └── Custom classes in components
```

### Responsive Breakpoints

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

---

## 📱 Component Responsiveness

### Mobile-First Components

- **ProductCard**: Stacks on mobile, grid on desktop
- **BranchSelectorDialog**: Full screen on mobile, modal on desktop
- **ProductSlider**: 1 slide mobile, 2-3 slides desktop
- **DeliveryMethodTabs**: Stacked mobile, inline desktop

---

## 🔍 Component Search Guide

### Finding Components by Purpose

**Need a button?** → `components/ui/button.tsx`  
**Need a dialog?** → `components/ui/dialog.tsx`  
**Need to display products?** → `components/common/product-card.tsx`  
**Need to show branches?** → `components/common/branch-list.tsx`  
**Need loading state?** → `components/common/loading-state.tsx`  
**Need empty state?** → `components/common/empty-state.tsx`  
**Need method selection?** → `presentation/home/components/delivery-method-tabs.tsx`  
**Need order flow?** → `presentation/home/components/order-flow-manager.tsx`

---

## 🛠️ Component Development Guidelines

### Creating New Components

1. **Determine Layer**: UI → Common → Presentation
2. **Define Props Interface**: TypeScript interface
3. **Add Accessibility**: ARIA labels, keyboard support
4. **Handle States**: Loading, error, empty
5. **Add Documentation**: JSDoc comments
6. **Export Types**: Export prop interfaces

### Component Naming

- **UI Primitives**: Single word (`Button`, `Card`)
- **Common Components**: Descriptive (`ProductCard`, `BranchList`)
- **Presentation Components**: Feature-based (`MethodSelectionPage`, `OrderFlowManager`)

---

**Last Updated**: 2024  
**Total Components**: 30+  
**Documentation**: Complete
