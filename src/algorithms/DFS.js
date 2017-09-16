import generalSearch from "./GeneralSearch"


const join = (newElements,array) => {
  return newElements.reverse().concat(array);
}

const DFS = (S,A,s,g) => {
  return generalSearch(S,A,s,g, join);
}

export default DFS;