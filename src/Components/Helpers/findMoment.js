export const findMoment = (moments, id) => {
   if (id === 0) return moments[0]
  for(let key in moments) {
    if(moments[key].id === id) {
      return moments[key]
    }
  }
}
