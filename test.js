const fs = require("fs");

let data = fs.readFileSync("./branches.json", "utf8");
let branches = JSON.parse(data);

const obj = [];
const sortedobj = [];


for (const key in branches) {
  const { expId, name, city, canUseShop, zip } = branches[key].store;
  if (canUseShop == true) {
    let storeObj = { id: parseInt(expId), name, city, zip };
    obj.push(storeObj);
  }
}

function groupByKey(array, key) {
  return array
    .reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      //console.log(obj[key]);
      return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
    }, {})
}



const grouped = groupByKey(obj, "name");
// console.log(obj.filter(x => x.name.includes("klein")));


//console.log(obj.length);
//console.log(Object.keys(grouped));


// function getNextMarket({ status = 200, bundleindex = 0, marketindex = 4 }) {
//   // Check for initial request
//   if (status === 200 && bundleindex === 0 && marketindex === 0) {
//     console.log(grouped[Object.keys(grouped)[bundleindex]][marketindex]);
//   } else {
//     if (status != 200) {
//       // If bundle length == 1 then it should also return the next bundle
//       if (grouped[Object.keys(grouped)[bundleindex]].length === 1 || marketindex === grouped[Object.keys(grouped)[bundleindex]][marketindex].length) {
//         bundleindex++;
//         console.log(grouped[Object.keys(grouped)[bundleindex]]);

//       } else {

//         // If bundle length > 1 then it should return the next market
//         marketindex++;
//         console.log(grouped[Object.keys(grouped)[bundleindex]][marketindex]);

//       }
//     } else {

//       bundleindex++;
//       console.log(grouped[Object.keys(grouped)[bundleindex]][marketindex]);

//     }
//   }
// }


//getNextMarket({});
//getNextMarket({ status: 200, bundleindex: 1, marketindex: 0 });
//console.log(marketgroupArray[0]);
//console.log(grouped);
//console.log(Object.keys(grouped));
//console.log(grouped["expert klein"].length);

function getNextExpertId() {
  let array = [];
  const marketgroup = Object.keys(grouped);
  for (const key in marketgroup) {
    if (true) {
      const obj = {
        name: grouped[marketgroup[key]][0].name,
        length: grouped[marketgroup[key]].length
      }
      array.push(obj);
    }

  }
  //console.log(array);
  const sorted = array.sort((a, b) => b.length - a.length);
  for (const key in sorted) {
    ///console.log(sorted[key].name);
    const sortedgroup = (grouped[sorted[key].name]);
    for (const key2 in sortedgroup) {
      const market = (sortedgroup[key2]);
      sortedobj.push(market);
    }
  }
}



getNextExpertId();
//const sorted2 = sortedobj.sort((a, b) => sortedobj[a].name - sortedobj[b].name);
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

//const sorted2 = sortByKey(sortedobj, "name");
//console.log(sorted2);
const sortedGroupExpertMarkets = groupByKey(sortedobj, "name");
console.log(Object.entries(sortedGroupExpertMarkets).length);
console.log(sortedGroupExpertMarkets);
//console.log(Object.entries(sortedGroupExpertMarkets));
//console.log(JSON.stringify(sortedGroupExpertMarkets));


