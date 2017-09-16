import generalSearch from "./GeneralSearch"

const join = (newElements,array) => {
  return array.concat(newElements);
}

const BFS = (S,A,s,g) => {
  return generalSearch(S,A,s,g, join);
}

export default BFS;