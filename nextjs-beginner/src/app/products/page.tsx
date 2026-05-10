"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import React, { useState, type ChangeEvent, type FormEvent } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  photo?: string;
};

export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [productForm, setProductForm] = useState<Product>({
    id: "",
    name: "",
    price: "",
    photo: "",
  });
  const [products, setProducts] = useState<Product[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productForm.name.trim() || !productForm.price.trim()) {
      return;
    }

    const newProduct: Product = {
      ...productForm,
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
    };

    setProducts((prev) => [newProduct, ...prev]);
    setProductForm({ id: "", name: "", price: "", photo: "" });
    setIsOpen(false);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  const handleAddToCart = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    setCart((prev) => [...prev, product]);
  };

  const handleCheckout = () => {
    alert(
      `Checked out ${cart.length} product(s) for a total of $${cart
        .reduce((total, product) => total + parseFloat(product.price), 0)
        .toFixed(2)}`,
    );
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <React.Fragment>
      <Navbar />

      <div className="max-w-5xl mx-auto">
        <div className="py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-sm text-slate-600">
              Create and list products that customers can add to their cart and
              purchase.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="relative active:scale-95"
              onClick={() => setIsCartOpen(true)}
            >
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cart.length}
                </div>
              )}
              <ShoppingCart />
            </Button>

            <Button className="active:scale-95" onClick={() => setIsOpen(true)}>
              New Product
            </Button>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
                <DialogDescription>
                  Add a new product and it will appear in the list below.
                </DialogDescription>
              </DialogHeader>

              <FieldGroup>
                <Field>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={productForm.name}
                    onChange={handleChange}
                    placeholder="Product name"
                  />
                </Field>

                <Field>
                  <Label>Price</Label>
                  <Input
                    name="price"
                    value={productForm.price}
                    onChange={handleChange}
                    placeholder="e.g. 19.99"
                  />
                </Field>

                <Field>
                  <Label>Photo</Label>
                  <Input
                    name="photo"
                    value={productForm.photo}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                  />
                </Field>
              </FieldGroup>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-slate-500">
              No products yet. Click <strong>New Product</strong> to add one.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-slate-200 p-5 shadow-sm space-y-4"
                >
                  <img
                    src={product.photo || "/placeholder-image.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <div className="flex flex-col items-start justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="text-2xl font-semibold">
                        ${product.price}
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAddToCart(product.id)}
                        className="active:scale-95"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Products Cart</DialogTitle>
              <DialogDescription>
                Manage the products in your cart.
              </DialogDescription>
            </DialogHeader>

            {cart.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-slate-500">
                Your cart is empty. Click <strong>Add to Cart</strong> on a
                product to add it here.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex gap-2">
                      <img
                        src={item.photo || "/placeholder-image.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-lg font-bold">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleCheckout}>
                Checkout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
