import React, { Suspense } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/page-header/PageHeader";
import CartItemSkeleton from "@/features/cart/components/CartItemSkeleton";
import Animate from "@/components/animate/Animate";
import { useCart } from "@/features/cart/hooks/useCart";
import CartItem from "@/features/cart/components/CartItem";

const CartPage: React.FC = () => {
  const { cart, cartTotal, cartSubtotal, cartContentsCount, isLoading, error } =
    useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="flex-grow flex flex-col bg-gray-100">
        <PageHeader title="سبد خرید" pageLink="/cart" />
        <div className="container mx-auto py-8 flex-grow flex items-center justify-center">
          <Animate animation="fadeIn" duration={0.5}>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-lg w-full transform transition-all hover:shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                برای مشاهده سبد خرید باید وارد شوید
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                لطفاً وارد حساب کاربری خود شوید تا بتوانید سبد خرید خود را
                مشاهده و مدیریت کنید.
              </p>
              <Button
                onClick={() => navigate("/auth/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                ورود به حساب کاربری
              </Button>
            </div>
          </Animate>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-gray-100">
      <Suspense
        fallback={
          <div className="container mx-auto py-8">
            <PageHeader title="سبد خرید" pageLink="/cart" />
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-3/5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))}
              </div>
              <div className="w-full lg:w-2/5">
                <div className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Animate
          animation="bottomToTop"
          duration={0.5}
          className="container mx-auto py-8"
        >
          <PageHeader title="سبد خرید" pageLink="/cart" />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-3/5">
              {error ? (
                <div className="bg-white rounded-lg shadow p-8 text-center text-red-500">
                  {error}
                </div>
              ) : isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))
              ) : !cart || !cart.length ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  سبد خرید خالی است
                </div>
              ) : (
                cart.map((item, index) => (
                  <CartItem
                    key={item.cart_item_key}
                    item={item}
                    index={index}
                  />
                ))
              )}
            </div>
            <div className="w-full lg:w-2/5">
              <Animate animation="fadeIn" duration={0.5}>
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">جمع‌بندی سبد خرید</h2>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">تعداد آیتم‌ها:</span>
                    <span className="font-semibold">{cartContentsCount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">جمع جزئی:</span>
                    <span className="font-semibold">
                      {parseInt(cartSubtotal || "0").toLocaleString("fa-IR")}{" "}
                      تومان
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">جمع کل:</span>
                    <span className="text-blue-600 font-bold">
                      {parseInt(cartTotal || "0").toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                  <Button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 text-lg font-semibold transition-all duration-300"
                  >
                    ادامه جهت تسویه حساب
                  </Button>
                </div>
              </Animate>
            </div>
          </div>
        </Animate>
      </Suspense>
    </div>
  );
};

export default CartPage;
