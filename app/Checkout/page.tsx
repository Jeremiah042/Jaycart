"use client";

import { useCart } from "@/Context/cartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Currency = "NGN" | "USD";

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  className = "",
}: FieldProps) {
  return (
    <label className={`${className} block`}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </label>
  );
}

// ── Delivery Options ──────────────────────────────────────────
const DELIVERY_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    duration: "3–5",
    returnWindow: 30,
    fee: 1500,
  },
  {
    id: "express",
    label: "Express Delivery",
    duration: "1–2",
    returnWindow: 14,
    fee: 3500,
  },
  {
    id: "overnight",
    label: "Overnight Delivery",
    duration: "1",
    returnWindow: 7,
    fee: 6000,
  },
];

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function getEstimatedDelivery(duration: string): string {
  const today = new Date();
  const [min, max] = duration.split("–").map(Number);
  const earliest = addBusinessDays(today, min);
  if (!max || min === max) return fmtDate(earliest);
  const latest = addBusinessDays(today, max);
  return `${fmtDate(earliest)} – ${fmtDate(latest)}`;
}

function getReturnDeadline(returnDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + returnDays);
  return date.toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Page ──────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const [currency, setCurrency] = useState<Currency>("NGN");
  const [usdToNgn, setUsdToNgn] = useState<number>(1354);
  const [rateLoading, setRateLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_OPTIONS[0].id);
  const [expandedProduct, setExpandedProduct] = useState<string | number | null>(null);

  const delivery = DELIVERY_OPTIONS.find((o) => o.id === selectedDelivery)!;

  // Fetch live USD/NGN rate
  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        if (data?.rates?.NGN) setUsdToNgn(data.rates.NGN);
      } catch {
        // silently fall back to default rate
      } finally {
        setRateLoading(false);
      }
    }
    fetchRate();
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);

  // Cart values stored in NGN internally
  const subtotalNgn = cartItems.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );
  const shippingNgn = subtotalNgn > 0 ? delivery.fee : 0;
  const totalNgn = subtotalNgn + shippingNgn;

  function formatPrice(amountNgn: number): string {
    const value = currency === "USD" ? amountNgn / usdToNgn : amountNgn;
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "USD" ? 2 : 0,
      maximumFractionDigits: currency === "USD" ? 2 : 0,
    }).format(value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const required = [
      "firstName", "lastName", "email", "phone",
      "address", "city", "state", "zip",
      "cardName", "cardNumber", "expiry", "cvv",
    ];
    const newErrors: Record<string, string> = {};
    required.forEach((field) => {
      if (!form[field as keyof typeof form].trim())
        newErrors[field] = "This field is required";
    });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    return newErrors;
  }

  async function handlePlaceOrder() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setPlacing(true);
    await new Promise((res) => setTimeout(res, 1500));
    clearCart();
    router.push("/order-success");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/Cart"
              className="text-sm text-gray-500 hover:text-gray-800 transition"
            >
              ← Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Checkout</h1>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            {(["NGN", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                  currency === c
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {c === "NGN" ? "₦ NGN" : "$ USD"}
              </button>
            ))}
          </div>
        </div>

        {/* Live rate badge */}
        {!rateLoading && (
          <p className="text-xs text-gray-400 mb-8">
            Live rate: $1 = ₦
            {usdToNgn.toLocaleString("en-NG", { maximumFractionDigits: 2 })}
            <span className="ml-1 text-gray-300">· updates on page load</span>
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Product Details */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Product Details</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your order
                </p>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-400 px-6 py-5">Your cart is empty.</p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {cartItems.map((item) => {
                    const isExpanded = expandedProduct === item.id;
                    const category = (item as { category?: string }).category;
                    const description = (item as { description?: string }).description;
                    return (
                      <li key={item.id} className="px-6 py-4">
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          {item.image && (
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {item.name}
                                </p>
                                {category && (
                                  <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                    {category}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-bold text-gray-800 shrink-0">
                                {formatPrice((item.price ?? 0) * (item.quantity ?? 1))}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 mt-2">
                              <p className="text-xs text-gray-400">
                                {formatPrice(item.price ?? 0)} × {item.quantity ?? 1}
                              </p>
                              {description && (
                                <button
                                  onClick={() =>
                                    setExpandedProduct(isExpanded ? null : item.id)
                                  }
                                  className="text-xs text-blue-500 hover:text-blue-700 transition underline underline-offset-2"
                                >
                                  {isExpanded ? "Hide details" : "View details"}
                                </button>
                              )}
                            </div>

                            {/* Expandable description */}
                            {isExpanded && description && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  {description}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* Delivery Options */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Delivery & Returns
              </h2>
              <p className="text-xs text-gray-400 mb-5">
                Choose a delivery speed. Return window starts from your delivery date.
              </p>

              <div className="space-y-3">
                {DELIVERY_OPTIONS.map((option) => {
                  const isSelected = selectedDelivery === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                        isSelected
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={isSelected}
                        onChange={() => setSelectedDelivery(option.id)}
                        className="sr-only"
                      />

                      {/* Custom radio dot */}
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition ${
                          isSelected ? "border-gray-900" : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-gray-900" />
                        )}
                      </div>

                      {/* Option content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-800">
                            {option.label}
                          </p>
                          <p className="text-sm font-bold text-gray-800 shrink-0">
                            {formatPrice(option.fee)}
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                          <div>
                            <p className="text-xs text-gray-400">Estimated delivery</p>
                            <p className="text-xs font-medium text-gray-700">
                              {getEstimatedDelivery(option.duration)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Return by</p>
                            <p className="text-xs font-medium text-gray-700">
                              {getReturnDeadline(option.returnWindow)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Return window</p>
                            <p className="text-xs font-medium text-gray-700">
                              {option.returnWindow} days
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Shipping Info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-5">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} />
                <Field label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} />
                <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} className="sm:col-span-2" />
                <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} className="sm:col-span-2" />
                <Field label="Street Address" name="address" value={form.address} onChange={handleChange} error={errors.address} className="sm:col-span-2" />
                <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} />
                <Field label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} />
                <Field label="ZIP / Postal Code" name="zip" value={form.zip} onChange={handleChange} error={errors.zip} />
              </div>
            </section>

            {/* Payment Info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-5">
                Payment Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name on Card" name="cardName" value={form.cardName} onChange={handleChange} error={errors.cardName} className="sm:col-span-2" />
                <Field label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" value={form.cardNumber} onChange={handleChange} error={errors.cardNumber} className="sm:col-span-2" />
                <Field label="Expiry Date" name="expiry" placeholder="MM / YY" value={form.expiry} onChange={handleChange} error={errors.expiry} />
                <Field label="CVV" name="cvv" placeholder="•••" value={form.cvv} onChange={handleChange} error={errors.cvv} />
              </div>
            </section>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-5">Order Summary</h2>

              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-400">Your cart is empty.</p>
              ) : (
                <ul className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      {item.image && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity ?? 1}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 shrink-0">
                        {formatPrice((item.price ?? 0) * (item.quantity ?? 1))}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Delivery summary card */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4 text-xs space-y-1 border border-gray-100">
                <p className="font-semibold text-gray-700">{delivery.label}</p>
                <p className="text-gray-500">
                  Arrives:{" "}
                  <span className="text-gray-700">
                    {getEstimatedDelivery(delivery.duration)}
                  </span>
                </p>
                <p className="text-gray-500">
                  Return by:{" "}
                  <span className="text-gray-700">
                    {getReturnDeadline(delivery.returnWindow)}
                  </span>
                </p>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotalNgn)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping ({delivery.label})</span>
                  <span>{shippingNgn > 0 ? formatPrice(shippingNgn) : "—"}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatPrice(totalNgn)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing || cartItems.length === 0}
                className="mt-6 w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition text-sm"
              >
                {placing ? "Placing Order…" : "Place Order"}
              </button>

              <p className="text-xs text-center text-gray-400 mt-3">
                Secured with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}