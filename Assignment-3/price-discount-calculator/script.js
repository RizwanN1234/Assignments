/* ==========================================================
   ASSIGNMENT 2 — PRICE & DISCOUNT CALCULATOR
   Pure JavaScript — variables, operators, conditionals,
   functions and scope. No DOM, no arrays.
========================================================== */

/* ----------------------------------------------------------
   1. PRODUCT VARIABLES
---------------------------------------------------------- */
const productName     = 'Wireless Headphones';
const basePrice       = 1200;         // in Rs.
const discountPercent = 15;           // 15%
const taxRate         = 18;           // 18% GST
const stockStatus     = 'limited';    // 'in_stock' | 'limited' | 'out_of_stock'


/* ----------------------------------------------------------
   2. calculateDiscountedPrice(price, discount)
      Returns price after applying discount %.
---------------------------------------------------------- */
function calculateDiscountedPrice(price, discount) {
  const discountAmount = (price * discount) / 100;
  const discountedPrice = price - discountAmount;
  return discountedPrice;
}


/* ----------------------------------------------------------
   3. calculateTax(price, taxRate)
      Returns tax amount = taxRate % of price.
---------------------------------------------------------- */
function calculateTax(price, taxRate) {
  const taxAmount = (price * taxRate) / 100;
  return taxAmount;
}


/* ----------------------------------------------------------
   4. calculateFinalPrice(price, discount, taxRate)
      Returns discounted price + tax.
---------------------------------------------------------- */
function calculateFinalPrice(price, discount, taxRate) {
  const discounted = calculateDiscountedPrice(price, discount);
  const tax        = calculateTax(discounted, taxRate);
  const finalPrice = discounted + tax;
  return finalPrice;
}


/* ----------------------------------------------------------
   5. isFreeShipping(finalPrice)
      'Free Shipping' if finalPrice >= 500, else 'Shipping: Rs.49'.
---------------------------------------------------------- */
function isFreeShipping(finalPrice) {
  if (finalPrice >= 500) {
    return 'Free Shipping';
  } else {
    return 'Shipping: Rs.49';
  }
}


/* ----------------------------------------------------------
   6. getStockMessage(status)
      Maps status string to a human-readable message.
      Uses switch — could also be if/else.
---------------------------------------------------------- */
function getStockMessage(status) {
  switch (status) {
    case 'in_stock':
      return 'In Stock';
    case 'limited':
      return 'Limited Stock';
    case 'out_of_stock':
      return 'Out of Stock';
    default:
      return 'Unknown Status';
  }
}


/* ----------------------------------------------------------
   7. CALL ALL FUNCTIONS & PRINT PRICE SUMMARY
---------------------------------------------------------- */
const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
const taxAmount       = calculateTax(discountedPrice, taxRate);
const finalPrice      = calculateFinalPrice(basePrice, discountPercent, taxRate);
const shippingMessage = isFreeShipping(finalPrice);
const stockMessage    = getStockMessage(stockStatus);

console.log('========================================');
console.log('        PRICE SUMMARY');
console.log('========================================');
console.log('Product        : ' + productName);
console.log('Base Price     : Rs.' + basePrice.toFixed(2));
console.log('Discount       : ' + discountPercent + '%');
console.log('----------------------------------------');
console.log('Discounted     : Rs.' + discountedPrice.toFixed(2));
console.log('Tax (' + taxRate + '%)      : Rs.' + taxAmount.toFixed(2));
console.log('Final Price    : Rs.' + finalPrice.toFixed(2));
console.log('----------------------------------------');
console.log('Shipping       : ' + shippingMessage);
console.log('Stock Status   : ' + stockMessage);
console.log('========================================');