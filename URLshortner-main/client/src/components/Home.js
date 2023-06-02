import React from 'react';
import './styles.css';
import { useState } from 'react';

function Home() {
    const [urlValue, setUrlValue] = useState("");
    const [short, setShort] = useState("");
    const [alias, setAlias] = useState("");
    const [isShortened, setIsShortened] = useState(false);
    const API_URL = "https://urlshortner-p3hw.onrender.com";
    console.log(alias);
    const handleClick = () => {
        fetch(API_URL + "/addurl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputUrl: urlValue,
                alias: alias,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setShort(data.Shortened);
                setIsShortened(true);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    };
    const handleShortenOneMore = () => {
        setUrlValue("");
        setIsShortened(false);
        setShort("");
    };
    console.log(short);
    console.log(urlValue);


    return (
        <div>
            <h3 className="flex items-center justify-center mt-2 text-3xl font-bold dark:text-blue">URL Shortener</h3>
            <div className='flex items-center justify-center h-screen'>
                <div className='bg-slate-400 w-1/2 flex flex-col items-center justify-center'>
                    <div>
                        <h4 className="text-3xl font-bold dark:text-white">Welcome!</h4>
                        <br></br>
                    </div>

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleClick();
                    }}>
                        <div className="mb-4">
                            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Enter URL :</label>
                            <input
                                type="text"
                                id="default-input"
                                placeholder='URL'
                                value={urlValue}
                                onChange={(e) => {
                                    setUrlValue(e.target.value);
                                }}
                                className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Customise URL :</label>
                            <input
                                type="text"
                                id="default-input"
                                placeholder='alias'
                                value={alias}
                                onChange={(e) => {
                                    setAlias(e.target.value);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-black">Your Short URL :</label>
                        <strong>{short}</strong>
                        <br></br>
                        <br></br>
                        {isShortened ? (
                            <button onClick={handleClick} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Short  URL
                            </button>
                        ) : (
                            <button type='submit' class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Shorten URL
                            </button>
                        )}


                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
