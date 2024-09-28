/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-white p-6 ">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                    <h1 className="text-[25px] md:text-[40px] lg:text-[50px] font-semibold text-[#205658]">Assalamu alaykum<span className='wave'>👋🏻</span></h1>
                    <h3 className="md:text-[20px] lg:text-[24px] text-gray-700">Turkcha Soati quiz app o'yiniga hush kelibsiz!</h3>
                    <Link to={"/register"}>
                        <button className="bg-[#f89d63] text-white px-[60px] mt-[50px] py-[10px] rounded-[5px] font-[500]">
                            Kirish
                        </button>
                    </Link>
                </div>
                <div className="mt-4 md:mt-0">
                    <img src="/header.webp" alt="Header" className="w-full h-auto rounded-md" />
                </div>
            </div>
        </header>
    );
}

export default Header;
