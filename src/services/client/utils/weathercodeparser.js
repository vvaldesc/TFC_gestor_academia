export default function classifyWeatherCode(code) {
  console.log("classifyWeatherCode", code);
  // Sunny
  const sunnyCodes = [800];
  // Cloudy
  const cloudyCodes = [801, 802, 803, 804];
  // Snowy
  const snowyCodes = [600, 601, 602, 610, 611, 612, 621, 622, 623];
  // Thunderstorm
  const thunderstormCodes = [200, 201, 202, 230, 231, 232, 233];
  // Drizzle
  const drizzleCodes = [300, 301, 302];
  // Rain
  const rainCodes = [500, 501, 502, 511, 520, 521, 522];
  // Mist
  const mistCodes = [700];
  // Smoke
  const smokeCodes = [711];
  // Haze
  const hazeCodes = [721];
  // Fog
  const fogCodes = [741, 751];

  if (sunnyCodes.includes(code)) {
      return "Sunny";
  } else if (cloudyCodes.includes(code)) {
      return "Cloudy";
  } else if (snowyCodes.includes(code)) {
      return "Snowy";
  } else if (thunderstormCodes.includes(code)) {
      return "Thunderstorm";
  } else if (drizzleCodes.includes(code)) {
      return "Drizzle";
  } else if (rainCodes.includes(code)) {
      return "Rain";
  } else if (mistCodes.includes(code)) {
      return "Mist";
  } else if (smokeCodes.includes(code)) {
      return "Smoke";
  } else if (hazeCodes.includes(code)) {
      return "Haze";
  } else if (fogCodes.includes(code)) {
      return "Fog";
  } else {
      return "Unknown";
  }
}