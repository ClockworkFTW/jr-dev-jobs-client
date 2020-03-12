const asyncGetCurrentLocaiton = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getCurrentLocation = async () => {
  try {
    const { coords } = await asyncGetCurrentLocaiton();
    const { latitude, longitude } = coords;
    return { latitude, longitude };
  } catch (error) {
    return error;
  }
};
