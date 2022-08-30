export const findEntry = (entries, id) => {
   if (id === 0) return entries[0]
  for(let key in entries) {
    if(entries[key].id === id) {
      return entries[key]
    }
  }
}
