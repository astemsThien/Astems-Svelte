/** @type {import('./$types').PageLoad} */
export async function load({ params }) {       
  return { totPrice: params.totPrice };
  }