import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import cloud from '../src/Images/cloud.png'
import clear from '../src/Images/clear.png'
import Rain from '../src/Images/Rain.png'
import mist from '../src/Images/mist.png'
import eror from '../src/Images/eror.png'
import "../src/wheather.css"

function Wheather() {
    const [search, SetSearch] = useState("")
    const [data, SetData] = useState()
    const [error, SetError] = useState()

    const API_key = "db0f865fd95db22e58117b89f42ffd0a"
    const Api = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

    const hanleInput = (event) => {
        SetSearch(event.target.value)

    }

    const getDataToSearchBar = async () => {
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`)
        const json = await get.json()
        console.log(json);
        SetData(json);

        if (search == '') {
            SetError("Please Enter Name")
        }
        else if (json.cod == 404) {
            SetError("Please Enter Valid Name !")
        }
        else {
            SetError("")
        }

        SetSearch("")

    }

    return (
        <>
            <h1 style={{ color: "white" }}>Wheather App</h1>
            <div className="container">

                <div className="input">
                    <input placeholder="Enter Your City & Country Name " value={search} onChange={hanleInput} />
                    <button onClick={getDataToSearchBar} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div>
                    {
                        error ?
                            <div>
                                <p>{error}</p>
                                <img src={eror} />

                            </div> : ""


                    }
                    {
                        data && data.weather ?
                            <div className='wheathers'>
                                <h2 className='cityname'>{data.name}</h2>
                                <img src={data.weather[0].main == "Clouds" ? cloud : ""} />
                                <img src={data.weather[0].main == "Rain" ? Rain : ""} />
                                <img src={data.weather[0].main == "Clear" ? clear : ""} />
                                <img src={data.weather[0].main == "Mist" ? mist : ""} />
                                <img src={data.weather[0].main == "Haze" ? cloud : ""} />
                                <h2 className='tempertaure'>{Math.trunc(data.main.temp)}°C</h2>
                                <p className='cilmate'>{data.weather[0].description}</p>
                            </div> : ""
                    }
                </div>

            </div>
        </>
    )
}

export default Wheather