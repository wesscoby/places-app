import { Place } from '..';


export const byDate = (a: Place, b: Place) => {
  const dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
  if(dateB > dateA) return 1;
  else if(dateA > dateB) return -1;
  else return 0;
}