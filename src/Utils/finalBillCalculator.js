export const finalBillCalculator = orders => {
  var clonedArray = JSON.parse(JSON.stringify(orders));
  var orderMultiplyCount = clonedArray.map(value => {
    value.price = value.price * value.count;
    return value;
  });

  var finalbill = orderMultiplyCount.reduce((acc, next) => {
    const { table_type, res_id, table_no, price } = next;
    var matcheditem = acc.find(
      item =>
        item.table_no === next.table_no && item.table_type === next.table_type
    );
    if (matcheditem) {
      matcheditem.price += next.price;
    } else {
      acc.push({ table_type, res_id, table_no, price });
    }
    //console.log(acc);
    return acc;
  }, []);

  return finalbill;
};
