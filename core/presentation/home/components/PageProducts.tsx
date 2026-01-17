import dynamic from "next/dynamic";
import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { BranchEntity } from "@/core/domain/entities/branch.entity";

// Lazy load slider components (keep SSR for SEO, but lazy load for performance)
const ProductSlider = dynamic(() => import("./productSlider").then(mod => ({ default: mod.ProductSlider })));

const OffersSlider = dynamic(() => import("./OffersSlider").then(mod => ({ default: mod.default })));

export const PageProducts = async ({ branch }: { branch: BranchEntity }) => {
  return (
    <>
      {/* <StructuredData branch={branchData} type="Restaurant" /> */}

      {/* Branch Info Header Section */}

      {/* Categories Sections */}
      <div className="flex flex-col w-full space-y-8 md:space-y-12 pb-24">
        <section className="w-full relative overflow-visible">
          <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
            <OffersSlider
              products={
                branch.categories?.find((category) =>
                  category.name_ar.includes("عروض")
                )?.products || []
              }
              title=""
            />
          </div>
        </section>
        {branch.categories?.slice(1).map((category: CategoryEntity) => (
          <section
            key={category.id}
            className="w-full relative overflow-visible"
          >
            <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
              <ProductSlider
                title={category.name_en}
                products={category.products}
                aspectRatio={"square"}
              />
            </div>
          </section>
        ))}
      </div>
    </>
  );
};
