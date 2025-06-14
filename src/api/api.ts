const API_BASE_URL =
  'https://my-json-server.typicode.com/vasylmartyniv/goit_rn_course_hw';

export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};
