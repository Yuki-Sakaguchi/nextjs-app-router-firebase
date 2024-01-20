import { getApiBase } from '@/utils/fetch';

export async function getTodos() {
  const apiBase = getApiBase();
  const data = await fetch(`${apiBase}/api/todo`);
  console.log(data);
  if (!data.ok) {
    throw new Error('error');
  }
  return data.json();
}
