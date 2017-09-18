import { timedGeneralSearch } from "./GeneralSearch"


const join = (newElements,array) => {
  return newElements.concat(array);
}

const DFS = (S,A,s,g) => {
  return timedGeneralSearch(S,A,s,g, join);
}

export default DFS;