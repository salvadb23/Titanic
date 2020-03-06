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

let compressWord = (string, n) => {
    let stack = [];
    let characters = string.split("")
    characters.forEach((char, i, arr) => {
      stack.push(char)
      if(stack.length >= n){
        let repeat = char.repeat(n)
        let check = stack.slice(stack.length - n, stack.length).join("")
        if(check == repeat){
          stack.splice(stack.length - n, stack.length)
        } 
      }
    })
    return stack.join("")
  }
  
  let example = "abababaab"
  let n = 2
  
  console.log(compressWord(example, n))