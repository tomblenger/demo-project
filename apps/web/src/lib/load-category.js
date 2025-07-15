export async function loadCategory() {
  const res = await fetch('/api/category')
  const data = await res.json();
  return data
}