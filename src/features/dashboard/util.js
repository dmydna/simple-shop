export function formatDate([year, month, day, hour, min], time=false) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dd = String(day).padStart(2, "0");
  const mmm = months[month - 1];

  const date = time ? 
    `${dd} ${mmm}, ${year}, ${hour}: ${min}` : 
    `${dd} ${mmm}, ${year}`

  return date;
}


export const pillColor = {
   "ADMIN":   "pill-dark",
   "CLIENT":  "pill-success",
/* --------------------------------- */
   "ACTIVE":   "pill-primary",
   "INACTIVE": "pill-secondary",
   "BANNED":   "pill-danger",
   "DRAFT":    "pill-dark",
/* --------------------------------- */
   "In Stock": "pill-success",
   "Low Stock": "pill-warning",
   "Out Stock": "pill-danger",
   "Pending":   "pill-secondary"
}



// @deprecated
export function statusColor([primary, success, danger], key){

  switch(key){
    case primary: return 'status-primary';
    case success: return 'status-success';
    case danger:  return 'status-danger';
  }

}
