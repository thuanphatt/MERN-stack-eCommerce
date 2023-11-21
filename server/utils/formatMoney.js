const formatMoney = (number) => Number(number?.toFixed(1)).toLocaleString();
const formatPrice = (number) => Math.round(number / 1000) * 1000;
module.exports = { formatMoney, formatPrice };
