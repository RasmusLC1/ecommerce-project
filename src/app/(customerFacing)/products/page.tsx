import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard";
import db from "@/db/db";
import { Suspense } from "react";

export default function ProductsPage() {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
    {/* {While function is waiting to load it loads 3 product card skeletons as placeholders} */}
    <Suspense
      fallback={
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      }
    >
      <ProductsSuspense/>
    </Suspense>
  </div>
}

function getProducts(){
    return db.product.findMany({where: {isAvailabelForPurchase: true}, orderBy: {name: "asc"},})
}

async function ProductsSuspense() {
    const products = await getProducts()
    return products.map(product =>
        <ProductCard key = {product.ID} {...product} />
    )
}