import { useState, useEffect } from 'react';

export const useTotalPrice = (cart, discountType, discountValue, checked, oneTick) => {
   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      let totalResult = getCartTotal(cart);
      let discountValueParsed = parseFloat(discountValue);

      // Apply discount
      if (discountType === 'fixed_amount') {
         totalResult += discountValueParsed;
      } else if (discountType === 'percentage') {
         totalResult *= (1 + discountValueParsed / 100);
      }

      // Add oneTick offer price if checked is true
      if (checked === true) {
         const offerPrice = parseFloat(oneTick?.design?.offer_price || 0);
         totalResult += offerPrice;
      }

      setTotalPrice(totalResult);
   }, [cart, discountType, discountValue, checked, oneTick]);

   return totalPrice;
};

// Helper function to calculate the total price from the cart
const getCartTotal = (cart) => {
   const totalNumber = cart?.total_price;
   const totalDecimalNumber = totalNumber / 100;
   const totalLastTwoDigits = totalNumber % 100;
   return totalDecimalNumber + totalLastTwoDigits / 100;
};


// Use in compontent


import React from 'react';
import { useTotalPrice } from './hooks/useTotalPrice';

const CartSummary = ({ cart, discountType, discountValue, checked, oneTick }) => {
   const totalPrice = useTotalPrice(cart, discountType, discountValue, checked, oneTick);

   return (
      <div>
         <h2>Total Price: {totalPrice.toFixed(2)}</h2>
      </div>
   );
};

export default CartSummary;
