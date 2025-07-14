import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Star,
  Heart,
  Search,
  Menu,
  X,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const product = {
  id: 1,
  name: "Nike Air Max 270",
  brand: "Nike",
  price: 149.99,
  originalPrice: 179.99,
  discount: 17,
  rating: 4.8,
  reviews: 234,
  description:
    "The Nike Air Max 270 delivers unrivaled all-day comfort with a sleek, running-inspired design. An Air Max unit in the heel provides lightweight cushioning, while the breathable mesh upper keeps your feet cool and comfortable.",
  features: [
    "Max Air unit in the heel for lightweight cushioning",
    "Breathable mesh upper for enhanced airflow",
    "Foam midsole for responsive cushioning",
    "Rubber outsole with waffle pattern for traction",
    "Pull tab for easy on and off",
  ],
  images: [
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
  ],
  colors: [
    { name: "Black/White", value: "black", image: "/api/placeholder/600/600" },
    { name: "White/Blue", value: "white", image: "/api/placeholder/600/600" },
    { name: "Red/Black", value: "red", image: "/api/placeholder/600/600" },
  ],
  sizes: [
    { value: "7", available: true },
    { value: "7.5", available: true },
    { value: "8", available: true },
    { value: "8.5", available: false },
    { value: "9", available: true },
    { value: "9.5", available: true },
    { value: "10", available: true },
    { value: "10.5", available: true },
    { value: "11", available: true },
    { value: "11.5", available: false },
    { value: "12", available: true },
  ],
  inStock: true,
  stockCount: 47,
};

const relatedProducts = [
  {
    id: 2,
    name: "Nike Air Max 90",
    price: 129.99,
    image: "/api/placeholder/300/300",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Nike Air Force 1",
    price: 119.99,
    image: "/api/placeholder/300/300",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Nike React Element",
    price: 139.99,
    image: "/api/placeholder/300/300",
    rating: 4.6,
  },
];

export default function Product() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log("Added to cart:", {
      product: product.name,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Buy now logic here
    console.log("Buy now:", {
      product: product.name,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Same as homepage */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-brand-navy">
                SolePeak
              </Link>
            </div>

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
      </nav>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-orange">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/men" className="hover:text-brand-orange">
            Men
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/men/sneakers" className="hover:text-brand-orange">
            Sneakers
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-brand-navy">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={selectedColor.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-brand-orange"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="bg-brand-orange/10 text-brand-orange"
                >
                  New
                </Badge>
                {product.discount && (
                  <Badge className="bg-red-500 text-white">
                    -{product.discount}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold text-brand-navy mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-brand-navy">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-brand-navy mb-3">
                Color: {selectedColor.name}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-colors overflow-hidden ${
                      selectedColor.value === color.value
                        ? "border-brand-orange"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-brand-navy mb-3">
                Size
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() =>
                      size.available && setSelectedSize(size.value)
                    }
                    disabled={!size.available}
                    className={`py-3 px-4 text-center border rounded-lg transition-colors ${
                      selectedSize === size.value
                        ? "border-brand-orange bg-brand-orange text-white"
                        : size.available
                          ? "border-gray-200 hover:border-brand-orange"
                          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <Link to="/size-guide" className="text-brand-orange underline">
                  Size Guide
                </Link>
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-brand-navy mb-3">
                Quantity
              </h3>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stockCount} remaining)
                  </span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-brand-orange hover:bg-brand-orange-dark text-white"
                  size="lg"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  variant="outline"
                  size="lg"
                  className="border-brand-orange"
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-brand-orange"}`}
                  />
                </Button>
              </div>
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                variant="outline"
                size="lg"
                className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-8 w-8 text-brand-orange mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">Orders over $75</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-brand-orange mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day policy</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-brand-orange mx-auto mb-2" />
                <p className="text-sm font-medium">Authentic</p>
                <p className="text-xs text-gray-500">100% genuine</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-brand-orange text-brand-orange py-4 px-1 text-sm font-medium">
                Description
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-4 px-1 text-sm font-medium">
                Features
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-4 px-1 text-sm font-medium">
                Reviews ({product.reviews})
              </button>
            </nav>
          </div>
          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-brand-navy mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden group">
                <div className="aspect-square bg-gray-100 p-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {relatedProduct.rating}
                    </span>
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-lg font-bold text-brand-navy">
                    ${relatedProduct.price}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
