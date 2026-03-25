// SERVER COMPONENT — fetches data, no "use client"
import CartProvider from "./CartProvider";
import CartSummary from "./CartSummary";
import AddToCart from "./AddToCart";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  return res.json();
}

export default async function ProductsPage() {
  // Fetch on server — no useEffect, no loading state
  const products = await getProducts();

  return (
    // CartProvider wraps everything so all children
    // can access cart context
    <CartProvider>
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🛍️ Products</h1>
          {/* Client Component — uses useCart context */}
          <CartSummary />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 
          lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            // Each card is Server rendered
            // Only AddToCart button is Client
            <div
              key={product.id}
              className="border rounded-xl p-4 
                flex flex-col hover:shadow-md transition-shadow"
            >
              <span
                className="text-xs text-blue-500 
                uppercase font-medium mb-2"
              >
                {product.category}
              </span>
              <h3 className="font-semibold text-sm mb-2 flex-1">
                {product.title}
              </h3>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                {product.description}
              </p>
              <p className="text-xl font-bold text-green-600">
                ${product.price}
              </p>
              {/* 
                Pattern 2 in action:
                Product card = Server rendered
                Only this tiny button = Client
                Pushed as LOW as possible! ✅
              */}
              <AddToCart productId={product.id} />
            </div>
          ))}
        </div>

        <a
          href="/"
          className="text-blue-500 hover:underline 
          mt-8 block"
        >
          ← Back Home
        </a>
      </div>
    </CartProvider>
  );
}
