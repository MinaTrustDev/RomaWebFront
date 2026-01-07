# Architecture Flow Graphs

## Complete System Architecture

```mermaid
graph TB
    subgraph "PRESENTATION LAYER"
        A1[app/page.tsx]
        A2[app/product/[id]/page.tsx]
        B1[branchItems.tsx]
        B2[order-flow-manager.tsx]
        B3[product-detail.tsx]
        C1[get-branch-items.action.ts]
        C2[get-branches.action.ts]
        C3[get-product-details.action.ts]
    end

    subgraph "APPLICATION LAYER"
        D1[GetBranchByIdUseCase]
        D2[GetBranchesUseCase]
        D3[GetProductByIdUseCase]
        E1[IBranchRepository Interface]
        E2[IProductRepository Interface]
        F1[UseCaseFactory]
    end

    subgraph "INFRASTRUCTURE LAYER"
        G1[BranchRepository]
        G2[ProductRepository]
        H1[axiosClient]
    end

    subgraph "DOMAIN LAYER"
        I1[BranchEntity]
        I2[ProductEntity]
        I3[BranchDTO]
        I4[ProductDTO]
        I5[SEO Constants]
    end

    subgraph "EXTERNAL"
        J1[WordPress API]
    end

    A1 --> B1
    A2 --> B3
    B1 --> C1
    B2 --> C2
    B3 --> C3

    C1 --> D1
    C2 --> D2
    C3 --> D3

    D1 --> E1
    D2 --> E1
    D3 --> E2

    D1 --> F1
    D2 --> F1
    D3 --> F1

    E1 --> G1
    E2 --> G2

    G1 --> H1
    G2 --> H1

    H1 --> J1

    J1 --> I1
    J1 --> I2

    I1 --> I3
    I2 --> I4

    I3 --> D1
    I4 --> D3

    D1 --> C1
    D2 --> C2
    D3 --> C3
```

## Feature 1: Get Branch Items - Detailed Flow

```mermaid
sequenceDiagram
    participant User
    participant Page as app/page.tsx
    participant Component as BranchItems
    participant Action as get-branch-items.action
    participant UseCase as GetBranchByIdUseCase
    participant Interface as IBranchRepository
    participant Repository as BranchRepository
    participant API as WordPress API
    participant Entity as BranchEntity
    participant DTO as BranchDTO

    User->>Page: Visits home page
    Page->>Component: Renders with branchId
    Component->>Action: getBranchItems(branchId)
    Action->>Action: Check cache (key: branch-items-{branchId})
    alt Cache Hit
        Action-->>Component: Return cached data
    else Cache Miss
        Action->>UseCase: execute(branchId)
        UseCase->>Interface: getBranchById(branchId)
        Interface->>Repository: getBranchById(branchId)
        Repository->>API: GET /stora/v1/branch-items?branch_id={id}
        API-->>Repository: Raw JSON data
        Repository->>Repository: transformToBranchEntities()
        Repository->>Entity: Create BranchEntity
        Entity-->>Repository: BranchEntity instance
        Repository-->>Interface: BranchEntity
        Interface-->>UseCase: BranchEntity
        UseCase->>UseCase: toBranchDTO()
        UseCase->>DTO: Convert to BranchDTO
        DTO-->>UseCase: BranchDTO
        UseCase-->>Action: BranchDTO
        Action->>Action: Cache result
        Action-->>Component: BranchDTO
    end
    Component->>Component: Render products
    Component-->>User: Display branch items
```

## Feature 2: Get Branches List - Detailed Flow

```mermaid
sequenceDiagram
    participant User
    participant Manager as OrderFlowManager
    participant Action as get-branches.action
    participant UseCase as GetBranchesUseCase
    participant Interface as IBranchRepository
    participant Repository as BranchRepository
    participant API as WordPress API
    participant Entity as BranchEntity[]
    participant DTO as BranchDTO[]

    User->>Manager: Selects delivery method
    Manager->>Action: getBranches(orderType)
    Action->>Action: Check cache (key: branches-{orderType})
    alt Cache Hit
        Action-->>Manager: Return cached data
    else Cache Miss
        Action->>UseCase: execute(orderType)
        UseCase->>UseCase: Convert "dine-in" to "dinein"
        UseCase->>Interface: getBranchesByOrderType(orderType)
        Interface->>Repository: getBranchesByOrderType(orderType)
        Repository->>API: GET /stora/v1/branch-items?order_type={type}
        API-->>Repository: Raw JSON array
        Repository->>Repository: transformToBranchEntities()
        Repository->>Entity: Create BranchEntity[]
        Entity-->>Repository: BranchEntity[]
        Repository-->>Interface: BranchEntity[]
        Interface-->>UseCase: BranchEntity[]
        UseCase->>UseCase: toBranchDTO() for each
        UseCase->>DTO: Convert to BranchDTO[]
        DTO-->>UseCase: BranchDTO[]
        UseCase-->>Action: BranchDTO[]
        Action->>Action: Cache result
        Action-->>Manager: BranchDTO[]
    end
    Manager->>Manager: Display branches in dialog
    Manager-->>User: Show branch selector
```

## Feature 3: Get Product Details - Detailed Flow

```mermaid
sequenceDiagram
    participant User
    participant Page as app/product/[id]/page.tsx
    participant Action as get-product-details.action
    participant UseCase as GetProductByIdUseCase
    participant Interface as IProductRepository
    participant Repository as ProductRepository
    participant API as WordPress API
    participant Entity as ProductEntity
    participant Component as ProductDetail

    User->>Page: Clicks product
    Page->>Page: generateMetadata() - for SEO
    Page->>Action: getProductDetails(productId)
    Action->>Action: Check cache (key: product-details-{productId})
    alt Cache Hit
        Action-->>Page: Return cached data
    else Cache Miss
        Action->>UseCase: execute(productId)
        UseCase->>Interface: getProductById(productId)
        Interface->>Repository: getProductById(productId)
        Repository->>API: GET /custom-api/v1/products/?product_id={id}
        API-->>Repository: Raw JSON data
        Repository->>Repository: transformToProductEntity()
        Repository->>Entity: Create ProductEntity
        Entity-->>Repository: ProductEntity instance
        Repository-->>Interface: ProductEntity
        Interface-->>UseCase: ProductEntity
        UseCase-->>Action: ProductEntity
        Action->>Action: Cache result
        Action-->>Page: ProductEntity
    end
    Page->>Page: Convert Entity to plain object
    Page->>Component: Render ProductDetail
    Page->>Page: Add ProductStructuredData (JSON-LD)
    Component-->>User: Display product details
```

## Data Transformation Flow

```mermaid
graph LR
    A[API Response<br/>Raw JSON] -->|Transform| B[Domain Entity<br/>BranchEntity/ProductEntity]
    B -->|Business Logic| C[Use Case<br/>GetBranchByIdUseCase]
    C -->|Convert to DTO| D[Data Transfer Object<br/>BranchDTO/ProductDTO]
    D -->|Serialize| E[Server Action<br/>get-branch-items.action]
    E -->|Cache| F[Next.js Cache<br/>unstable_cache]
    F -->|Return| G[React Component<br/>BranchItems]
    G -->|Render| H[User Interface<br/>HTML/React]
```

## Dependency Graph

```mermaid
graph TD
    subgraph "No Dependencies"
        D1[Domain Entities]
        D2[Domain DTOs]
        D3[Domain Constants]
    end

    subgraph "Depends on Domain Only"
        A1[Use Cases]
        A2[Interfaces]
    end

    subgraph "Depends on Application"
        I1[Repositories]
        I2[Factories]
    end

    subgraph "Depends on Application"
        P1[Server Actions]
        P2[Components]
    end

    A1 --> D1
    A1 --> D2
    A2 --> D1
    I1 --> A2
    I1 --> D1
    P1 --> A1
    P2 --> P1
    P2 --> D2
```

## Caching Flow

```mermaid
graph TD
    A[Component Request] -->|1. Check Cache| B{Cache Hit?}
    B -->|Yes| C[Return Cached Data]
    B -->|No| D[Call Use Case]
    D --> E[Fetch from API]
    E --> F[Transform to Entity]
    F --> G[Convert to DTO]
    G --> H[Store in Cache]
    H -->|Cache Key| I[branch-items-{branchId}<br/>product-details-{productId}<br/>branches-{orderType}]
    I --> J[Return to Component]
    C --> J
    J --> K[Render UI]
```

---

## Layer Responsibilities

| Layer | Responsibility | Can Depend On | Cannot Depend On |
|-------|---------------|---------------|------------------|
| **Domain** | Entities, DTOs, Constants | None | Nothing |
| **Application** | Use Cases, Interfaces | Domain | Infrastructure, Presentation |
| **Infrastructure** | Repositories, External Services | Application, Domain | Presentation |
| **Presentation** | UI, Pages, Actions | Application, Domain | Infrastructure (directly) |

---

## Key Principles

1. **Dependency Rule**: Dependencies point inward (toward Domain)
2. **Interface Segregation**: Small, focused interfaces
3. **Single Responsibility**: Each class/function has one job
4. **Open/Closed**: Open for extension, closed for modification
5. **Dependency Inversion**: Depend on abstractions, not concretions

