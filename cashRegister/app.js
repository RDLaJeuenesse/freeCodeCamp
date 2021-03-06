function checkCashRegister(price, cash, cid) {
  var change = (cash - price).toFixed(2);
  console.log(`
  change: ${change}
  `);
  var tinder = {};
  var status = '';
  change = makeChange(change);
  cid.reverse();
  change = change.map(function(value,index){
    return [cid[index][0],value];
  })
  console.log('cid');
  console.log(cid);
  console.log('change');
  console.log(change);
  status = change.reduce(function(preVal, curVal, curInd){
    if(preVal !== 'INSUFFICINENT_FUNDS'){
      status = cid[curInd][1] - curVal[1] >= 0 ? true : 'INSUFFICINENT_FUNDS';
    }
    preVal = status; 
    return status;
  });
  if(status === true){
    var totalCash = 0;
    totalCash = cid.map(function(val,ind){
      var amount = val[1];
      return amount;
    }).reduce(function(a,b){
      return a + b;
    });
    totalChange = change.map(function(val,ind){
      var amount = val[1];
      return amount;
    }).reduce(function(a,b){
      return a + b;
    });
    console.log(`
    totalChange: ${totalChange}
    totalCash: ${totalCash}
    `);
    status = totalCash > totalChange;
    status === true ? status = 'OPEN' : status = 'CLOSED'
  }
  tinder.status = status;
  if(tinder.status !== 'INSUFFICINENT_FUNDS'){
    tinder.change = change.filter(function(val,ind){
      var portion = val[1];
      return portion > 0;
    })
  }else{
    tinder.change = [];
  }
  return tinder;
}
function makeChange(...args){
  const denominationsArr = [100,20,10,5,1,.25,.10,.05,.01];
  var change = args[0];
  var denomination = args[1];
  denomination === undefined ? denomination = 0 : denomination = args[1];
  var changeArr = args[2];
  changeArr === undefined ? changeArr = [] : changeArr = args[2];
  if(change / denominationsArr[denomination] >= 1){
    changeArr.push(parseInt((change / denominationsArr[denomination])));
    change = (change - (changeArr[denomination] * denominationsArr[denomination])).toFixed(2);
    if(change > 0){
      denomination = denomination + 1;
      makeChange(change, denomination, changeArr);
    }
  }else{
    changeArr.push(0);
    denomination += 1;
    makeChange(change,denomination, changeArr);
  }
  changeArr = changeArr.map(function(value, index){
    return value * denominationsArr[index];
  })
  return changeArr;
}

console.log(checkCashRegister(19.5, 25.72, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
