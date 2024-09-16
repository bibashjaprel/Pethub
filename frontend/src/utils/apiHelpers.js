export const getAdoptionRequests = async () => {
  const response = await fetch('/api/adoption-requests');
  const data = await response.json();
  return data;
};

export const getAdoptionApplications = async () => {
  const response = await fetch('/api/adoption-applications');
  const data = await response.json();
  return data;
};

export const clearToken = () => {
  localStorage.removeItem('token');
};
