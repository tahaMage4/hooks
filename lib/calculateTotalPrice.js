export const calculateTotalPrice = (cart, discountType, discountValue, checked, oneTick) => {
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

   return totalResult;
};

const getCartTotal = (cart) => {
   const totalNumber = cart?.total_price;
   const totalDecimalNumber = totalNumber / 100;
   const totalLastTwoDigits = totalNumber % 100;
   return totalDecimalNumber + totalLastTwoDigits / 100;
};



// Use in the compontent
import React from 'react';
import { calculateTotalPrice } from './utils/calculateTotalPrice';

const CartSummary = ({ cart, discountType, discountValue, checked, oneTick }) => {
   const totalPrice = calculateTotalPrice(cart, discountType, discountValue, checked, oneTick);

   return (
      <div>
         <h2>Total Price: {totalPrice.toFixed(2)}</h2>
      </div>
   );
};

export default CartSummary;
