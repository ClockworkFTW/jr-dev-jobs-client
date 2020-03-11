const asyncGetCurrentLocaiton = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getCurrentLocation = async setPosition => {
  try {
    const { coords } = await asyncGetCurrentLocaiton();
    const { latitude, longitude } = coords;
    setPosition({ latitude, longitude });
  } catch (error) {
    console.log(error);
  }
};
