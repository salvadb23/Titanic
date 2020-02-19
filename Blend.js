let reduceCapacity = (arr) => {
  let n = arr.length 
  let ceiling = Math.ceil(n/2)
  let map = {}
  for(let num of arr){
    map[num] = map[num] + 1 || 1
  }
  let values = Object.values(map).sort((a,b) => b - a)
  let count = 0
  let res = 0
  while(count < ceiling){
    count += values.shift()
    res++
  }
  return res
}

let example = [7,10,1,2,7,7,1]

console.log(reduceCapacity(example))

let