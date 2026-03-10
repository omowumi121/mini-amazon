"use client";

import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { useProducts } from "@/context/ProductContext";
import HeroSection from "@/components/HeroSection";
import PromoSlider from "@/components/PromoSlider";
import TopSales from "@/components/TopSales";

export default function Home() {
  const { products } = useProducts();

  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">

      {/* HERO SECTION */}
      <HeroSection />
      <PromoSlider />
      <TopSales />

      {/* FEATURED PRODUCTS */}
      <motion.section
        className="mb-12 "
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

    </main>
  );
}
