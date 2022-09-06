const { log } = require("console");
const fs = require("fs");

let data = fs.readFileSync("/home/ediz/Documents/Coding/PreisDetektivEXFF/branches.json", "utf8");
let branches = JSON.parse(data);

const obj = [];


for (const key in branches) {
  const { expId, name, city, canUseShop } = branches[key].store;
  if (canUseShop == true) {
    let storeObj = { Id: parseInt(expId), name, city };
    obj.push(storeObj);
  }
}

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function groupByKey(array, key) {
  return array
    .reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
    }, {})
}

const grouped = groupBy(obj, "name");
// console.log(obj.filter(x => x.name.includes("klein")));


console.log(obj.length);
console.log(Object.keys(grouped).length);


console.log(grouped);
console.log(grouped["expert klein"].map(x => x.Id));
