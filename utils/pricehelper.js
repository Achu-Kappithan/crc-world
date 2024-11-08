// exports.getAvailablePrice = function(sizes) {
//     for (const size of sizes) {
//       if (size.stock > 0) {
//         return size.Salesprice;
//       }
//     }
//     return null;
//   };
  
//   exports.formatPrice = function(price) {
//     return price 
//       ? price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) 
//       : 'Unavailable';
//   };


const price = function(size) {
  let finalprice = 0;

  for (let value of size) {
    if (value.priceafteroffer !== undefined && value.priceafteroffer > 0) {
      finalprice = value.priceafteroffer;
    } else if (value.Salesprice > 0) {
      finalprice = value.Salesprice;
    }

    if (finalprice > 0) {
      return Math.round(finalprice);
    }
  }

  return "Unavailable";
};



module.exports = {price};