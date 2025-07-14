import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Star,
  Heart,
  Search,
  Menu,
  X,
  User,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredShoes = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 149.99,
    originalPrice: 179.99,
    image: "/api/placeholder/400/400",
    rating: 4.8,
    reviews: 234,
    colors: ["black", "white", "red"],
    isNew: true,
    discount: 17,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    price: 179.99,
    image: "/api/placeholder/400/400",
    rating: 4.9,
    reviews: 156,
    colors: ["black", "gray", "blue"],
    isBestseller: true,
  },
  {
    id: 3,
    name: "Jordan Retro 1 High",
    brand: "Jordan",
    price: 169.99,
    image: "/api/placeholder/400/400",
    rating: 4.7,
    reviews: 89,
    colors: ["red", "black", "white"],
    isNew: true,
  },
  {
    id: 4,
    name: "Vans Old Skool",
    brand: "Vans",
    price: 89.99,
    image: "/api/placeholder/400/400",
    rating: 4.6,
    reviews: 312,
    colors: ["black", "white", "navy"],
    discount: 20,
    originalPrice: 112.49,
  },
];

const categories = [
  { name: "Running", image: "/api/placeholder/300/200", count: 120 },
  { name: "Basketball", image: "/api/placeholder/300/200", count: 89 },
  { name: "Lifestyle", image: "/api/placeholder/300/200", count: 156 },
  { name: "Training", image: "/api/placeholder/300/200", count: 78 },
];

const brands = [
  { name: "Nike", logo: "/api/placeholder/120/60" },
  { name: "Adidas", logo: "/api/placeholder/120/60" },
  { name: "Jordan", logo: "/api/placeholder/120/60" },
  { name: "Puma", logo: "/api/placeholder/120/60" },
  { name: "Converse", logo: "/api/placeholder/120/60" },
  { name: "Vans", logo: "/api/placeholder/120/60" },
];

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-brand-navy">
                SolePeak
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/men"
                className="text-gray-700 hover:text-brand-orange transition-colors"
              >
                Men
              </Link>
              <Link
                to="/women"
                className="text-gray-700 hover:text-brand-orange transition-colors"
              >
                Women
              </Link>
              <Link
                to="/kids"
                className="text-gray-700 hover:text-brand-orange transition-colors"
              >
                Kids
              </Link>
              <Link
                to="/brands"
                className="text-gray-700 hover:text-brand-orange transition-colors"
              >
                Brands
              </Link>
              <Link to="/sale" className="text-brand-orange font-medium">
                Sale
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for shoes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-brand-orange transition-colors">
                <User className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-brand-orange transition-colors relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              <Link to="/men" className="block px-3 py-2 text-gray-700">
                Men
              </Link>
              <Link to="/women" className="block px-3 py-2 text-gray-700">
                Women
              </Link>
              <Link to="/kids" className="block px-3 py-2 text-gray-700">
                Kids
              </Link>
              <Link to="/brands" className="block px-3 py-2 text-gray-700">
                Brands
              </Link>
              <Link
                to="/sale"
                className="block px-3 py-2 text-brand-orange font-medium"
              >
                Sale
              </Link>
            </div>
            {/* Mobile search */}
            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for shoes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 bg-brand-orange/10 text-brand-orange border-brand-orange/20"
              >
                New Collection
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-navy mb-6 leading-tight">
                Step Into Your
                <span className="text-brand-orange"> Best Self</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Discover the latest collection of premium athletic and lifestyle
                footwear from top brands. Find your perfect fit and elevate your
                style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8"
                >
                  Shop Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  View Collection
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 rounded-2xl flex items-center justify-center">
                <img
                  src="/api/placeholder/500/500"
                  alt="Featured Shoe"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-orange text-white rounded-lg p-3 shadow-lg">
                <div className="text-sm font-medium">30% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect shoes for every activity and lifestyle
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{category.name}</h3>
                    <p className="text-sm opacity-90">
                      {category.count} products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-brand-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites from our latest collection
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredShoes.map((shoe) => (
              <div
                key={shoe.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <Link to={`/product/${shoe.id}`} className="block">
                  <div className="relative aspect-square bg-gray-100 p-4">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(shoe.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(shoe.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                      />
                    </button>
                    {shoe.isNew && (
                      <Badge className="absolute top-3 left-3 bg-brand-orange text-white">
                        New
                      </Badge>
                    )}
                    {shoe.isBestseller && (
                      <Badge className="absolute top-3 left-3 bg-brand-navy text-white">
                        Bestseller
                      </Badge>
                    )}
                    {shoe.discount && (
                      <Badge className="absolute top-9 left-3 bg-red-500 text-white">
                        -{shoe.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {shoe.rating} ({shoe.reviews})
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{shoe.brand}</p>
                    <h3 className="font-semibold text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                      {shoe.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {shoe.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full border-2 border-gray-200 ${
                            color === "black"
                              ? "bg-black"
                              : color === "white"
                                ? "bg-white"
                                : color === "red"
                                  ? "bg-red-500"
                                  : color === "blue"
                                    ? "bg-blue-500"
                                    : color === "gray"
                                      ? "bg-gray-500"
                                      : color === "navy"
                                        ? "bg-blue-900"
                                        : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-brand-navy">
                          ${shoe.price}
                        </span>
                        {shoe.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${shoe.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-brand-orange hover:bg-brand-orange-dark text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic here
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Top Brands
            </h2>
            <p className="text-gray-600">
              Shop from the world's leading footwear brands
            </p>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {brands.map((brand, index) => (
              <Link
                key={index}
                to={`/brand/${brand.name.toLowerCase()}`}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-brand-orange/5 hover:shadow-md transition-all duration-300 group"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-brand-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new releases, exclusive offers, and style
            tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            />
            <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-brand-orange">
                SolePeak
              </h3>
              <p className="text-brand-gray-400 mb-4">
                Your ultimate destination for premium footwear from top brands
                worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-brand-gray-400 hover:text-brand-orange transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-brand-gray-400 hover:text-brand-orange transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-brand-gray-400 hover:text-brand-orange transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-brand-gray-400">
                <li>
                  <Link
                    to="/men"
                    className="hover:text-white transition-colors"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    to="/women"
                    className="hover:text-white transition-colors"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kids"
                    className="hover:text-white transition-colors"
                  >
                    Kids
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sale"
                    className="hover:text-white transition-colors"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-brand-gray-400">
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="hover:text-white transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="hover:text-white transition-colors"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-brand-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-gray-700 mt-8 pt-8 text-center text-brand-gray-400">
            <p>&copy; 2024 SolePeak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
