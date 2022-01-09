export const removeCountryById = async (id: number) => {
  const data = await fetch(`http://127.0.0.1:8000/country/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'json/application',
    },
  });
  if (data.ok) {
    return true;
  } else {
    return false;
  }
};
