export const getCurrentLocationLatitudeAndLongitude = (
  callback: (
    error: Error | null,
    location?: { lat: number; lon: number }
  ) => void
): void => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      callback(null, {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    },
    (error) => {
      callback(new Error(error.message))
    }
  )
}
