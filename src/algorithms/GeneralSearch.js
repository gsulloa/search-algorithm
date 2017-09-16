import _ from 'lodash';

export default function generalSearch(S,A,s,g, join){
    let u, v, succ, next;
    let closed = [];
    let open = [s];
    s.parent = null;
    while(open.length != 0){
      //Getting first element of Open
      u = open.shift();
      //Setting closed the element
      closed.push(u)
      // TODO: calc succ
      next = $.grep(succ, function(el){return $.inArray(el, open.concat(closed)) == -1});
      for(i in next){
        v = next[i];
        v.parent = u;
        if(_.isEqual(v,g)){
          return v
        }
      }
      open = join(next,open)
  }
}
