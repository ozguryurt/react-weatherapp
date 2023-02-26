import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from './redux/slice/weather';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const [cityName, setCityName] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const onChangeFunction = (e) => {
    setCityName(e.target.value);
  }

  const searchBtn = () => {
    dispatch(fetchWeatherData(cityName));
    setIsClicked(true);
  }

  return (
    <>
      {
        isClicked ?
          state.weather.isLoading ?
            <>
              <div className="mx-auto w-1/4 h-90 rounded-md bg-neutral-700 my-10 p-5 flex flex-row gap-3">
                <input onChange={onChangeFunction} className="p-3 rounded-md w-1/2 font-semibold" type="text" placeholder="City name" />
                <button onClick={searchBtn} className="p-3 rounded-md bg-white w-1/2 font-bold transition-all hover:scale-105">Search</button>
              </div>
              <div className="mx-auto w-1/4 h-90 rounded-md bg-neutral-700 p-5">
                <h1 className="font-bold text-white text-4xl">Loading data...</h1>
              </div>
            </>
            :
            state.weather.data?.cod == 400 || state.weather.data?.cod == 404 ?
              <>
                <div className="mx-auto w-1/4 h-90 rounded-md bg-neutral-700 my-10 p-5 flex flex-row gap-3">
                  <input onChange={onChangeFunction} className="p-3 rounded-md w-1/2 font-semibold" type="text" placeholder="City name" />
                  <button onClick={searchBtn} className="p-3 rounded-md bg-white w-1/2 font-bold transition-all hover:scale-105">Search</button>
                </div>
                <div className="mx-auto w-1/4 h-90 rounded-md bg-neutral-700 p-5">
                  <h1 className="font-bold text-white text-4xl">City not found.</h1>
                </div>
              </>
              :
              <>
                <div className="mx-auto w-1/4 h-90 rounded-md bg-neutral-700 my-10 p-5 flex flex-row gap-3">
                  <input onChange={onChangeFunction} className="p-3 rounded-md w-1/2 font-semibold" type="text" placeholder="City name" />
                  <button onClick={searchBtn} className="p-3 rounded-md bg-white w-1/2 font-bold transition-all hover:scale-105">Search</button>
                </div>
                <div className="mx-auto w-1/4 h-90 rounded-md bg-neutral-700 p-5">
                  <div className="header flex flex-row items-center">
                    <div className="headerText w-1/2 flex flex-col items-start">
                      <h1 className="font-bold text-white text-4xl">{state?.weather?.data?.name.toUpperCase()}</h1>
                      <h1 className="font-bold text-white text-xl">{state?.weather?.data?.weather[0]?.main}</h1>
                    </div>
                    <div className="headerImg w-1/2 flex flex-col items-end">
                      <img className="w-20 h-20" src={'http://openweathermap.org/img/wn/' + state?.weather?.data?.weather[0]?.icon + '.png'} alt="" />
                    </div>
                  </div>
                  <div className="body flex flex-row items-center mt-10">
                    <div className="bodyText w-1/2 flex flex-col items-start">
                      <h1 className="font-bold text-white text-5xl">{state?.weather?.data?.main?.temp} °C</h1>
                    </div>
                    <div className="bodyText w-1/2 flex flex-col items-start">
                      <h1 className="font-bold text-white text-sm">Feels like: {state?.weather?.data?.main?.feels_like} °C</h1>
                      <h1 className="font-bold text-white text-sm">Humidity: {state?.weather?.data?.main?.humidity}</h1>
                      <h1 className="font-bold text-white text-sm">Pressure: {state?.weather?.data?.main?.pressure}</h1>
                    </div>
                  </div>
                </div>
              </>
          :
          <>
            <div className="mx-auto w-1/4 h-90 rounded-md bg-neutral-700 my-10 p-5 flex flex-row gap-3">
              <input onChange={onChangeFunction} className="p-3 rounded-md w-1/2 font-semibold" type="text" placeholder="City name" />
              <button onClick={searchBtn} className="p-3 rounded-md bg-white w-1/2 font-bold transition-all hover:scale-105">Search</button>
            </div>
          </>
      }
    </>
  );
}

export default App;
