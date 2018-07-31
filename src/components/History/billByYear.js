export function yearwiseData(data){
      let historyList=[];
      let yearList=[];
      let yearwiseAmount=[];
      historyList=data;
      const {length}=data;
      if(length){
       yearList=[...Array.from(new Set(historyList.map(hl=>hl.year)))];
       for(let y of yearList){
            let amount=0;
            for(let h of historyList){
                if(y===h.year)
                    amount+=Number(h.price);
            }
          yearwiseAmount.push({year:y,amount});
       }
      }
  return yearwiseAmount;
}

export function showMonthWise(year,data){
  let historyList=[];
  historyList=data;
  let monthWiseAmount=[];
       const monthData=historyList.filter(hl=>hl.year===year);
       const monthList=[...Array.from(new Set(monthData.map(ml=>ml.month)))];
       for(let y of monthList){
            let amount=0;
            let year;
            for(let h of monthData){
                year=h.year;
                if(y===h.month)
                    amount+=Number(h.price);
            }
            monthWiseAmount.push({year,amount,month:y});
       }
      return monthWiseAmount;
     }
