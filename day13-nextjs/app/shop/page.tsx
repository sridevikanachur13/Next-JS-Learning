import CartIcon from "./CartIcon";
import CartSidebar from "./CartSlider";
import ProductCard from "./ProductCart";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://fakestoreapi.com/products",
    { next: { revalidate: 3600 } }, // ISR — products change rarely
  );
  return res.json();
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-30">
        <div
          className="max-w-6xl mx-auto px-6 py-4
          flex justify-between items-center"
        >
          <h1 className="text-xl font-bold">🛍️ Next Shop</h1>
          {/* Client Component — cart count updates live */}
          <CartIcon />
        </div>
      </nav>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div
          className="grid grid-cols-2 md:grid-cols-3
          lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            // Server renders the shell
            // ProductCard is Client for interactivity
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Cart Sidebar — always mounted, shown/hidden with CSS */}
      <CartSidebar />
    </div>
  );
}
