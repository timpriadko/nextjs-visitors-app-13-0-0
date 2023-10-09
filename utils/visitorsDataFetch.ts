export interface singleVisitorDataInterface {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  date: string;
}

export interface visitorsDataInterface {
  data: singleVisitorDataInterface[];
}

export async function getVisitorsData(): Promise<visitorsDataInterface> {
  const res = await fetch("https://reqres.in/api/users");
  const visitorsData = await res.json();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return visitorsData || {};
}

export default getVisitorsData;
