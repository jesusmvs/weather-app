import React, { useState } from "react";

export const WeatherApp = () => {
	const urlBase = "https://api.openweathermap.org/data/2.5/weather"; //?q={city name}&appid={API key}
	const difKelvin = 273.15;

	const [city, setCity] = useState("");
	const [dataWeather, setDataWeather] = useState(null);

	const handleChange = (e) => {
		setCity(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log(e);
		if (city.length > 0) fetchWeather();
	};

	const fetchWeather = async () => {
		try {
			const response = await fetch(
				`${urlBase}?q=${city}&appid=${import.meta.env.VITE_REACT_API_KEY}`
			);
			const data = await response.json();
			//console.log(data);
			if (data.cod == 404) return;
			setDataWeather(data);
		} catch (error) {
			console.error("Whops something went wrong: ", error);
		}
	};

	return (
		<div className="container">
			<h1>WeatherApp</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="city" value={city} onChange={handleChange} />
				<button type="submit">Search</button>
			</form>
			{dataWeather && (
				<div>
					<h2>{dataWeather.name}</h2>
					<p>Temperature: {parseInt(dataWeather?.main?.temp - difKelvin)}°C</p>
					<p>
						Real Feel: {parseInt(dataWeather?.main?.feels_like - difKelvin)}°C
					</p>
					<p>Conditions: {dataWeather.weather[0].description.toUpperCase()}</p>
					<img
						src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
						alt={dataWeather.weather[0].description.toUpperCase()}
					/>
				</div>
			)}
		</div>
	);
};
