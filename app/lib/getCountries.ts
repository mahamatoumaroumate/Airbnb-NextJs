import countries from 'world-countries'

const countriesFormatted = countries.map((item) => ({
  value: item.cca2,
  label: item.name.common,
  flag: item.flag, // Keep the emoji flag if you need it elsewhere.
  flagUrl: `https://flagcdn.com/w320/${item.cca2.toLowerCase()}.png`, // URL to the flag image.
  latLang: item.latlng,
  region: item.region,
}))

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted
  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value)
  }
  return {
    getAllCountries,
    getCountryByValue,
  }
}
