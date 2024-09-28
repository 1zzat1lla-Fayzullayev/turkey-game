/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Wrapper from "../layout/wrapper";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

function Navbar({ onLogout, username }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Haqiqatan ham tizimdan chiqmoqchimisiz?",
      text: "Hisobingizga kirish uchun yana tizimga kirishingiz kerak bo'ladi.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ha, tizimdan chiqing!",
      cancelButtonText: "Bekor qilish"
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        Swal.fire({
          title: "Hisobdan chiqildi!",
          text: "Siz tizimdan muvaffaqiyatli chiqdingiz.",
          icon: "success"
        });
      }
    });
  };
  

  const changeNavbar = () => {
    if (window.scrollY >= 30 && !isMenuOpen) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`fixed w-screen z-[999] ${
        navbar && !isMenuOpen ? "blur-background" : ""
      }`}
    >
      <Wrapper>
        <div className="flex justify-between items-center py-3 md:py-4 relative z-[999] px-[20px] xl:px-0">
          <div className="flex items-center gap-[30px]">
            <Link to={"/"}>
              <img
                src="/logo.png"
                alt="Logo"
                className="w-36 lg:w-44 cursor-pointer"
              />
            </Link>
            <ul className="lg:flex hidden items-center gap-[20px]">
              <li>
                <a className="text-base flex cursor-pointer dark:text-white dark:opacity-50">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-base flex cursor-pointer dark:text-white dark:opacity-50">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-[15px]">
            {username ? (
              <div className="flex items-center">
                <span className="text-gray-800 dark:text-white">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-4 bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md"
                >
                  Chiqish
                </button>
              </div>
            ) : (
              <Link to={"/register"}>
                <button className="bg-[#2ecc71] text-white px-[25px] py-[7px] rounded-[5px] font-[500]">
                  Kirish
                </button>
              </Link>
            )}

            <div
              className={`burger ${isMenuOpen ? "open" : ""} block lg:hidden`}
              onClick={toggleMenu}
            >
              <div className="w-[25px] h-[2px] rounded-full block duration-300 bg-[black] dark:bg-white"></div>
              <div className="w-[25px] h-[2px] rounded-full block duration-300 bg-[black] dark:bg-white"></div>
              <div className="w-[25px] h-[2px] rounded-full block duration-300 bg-[black] dark:bg-white"></div>
            </div>
          </div>
        </div>
      </Wrapper>
      <div
        className={`menu duration-300 h-full xl:w-[calc(100%-170px)] lg:hidden max-w-xl xl:max-w-none xl:h-auto bg-white fixed inset-0 z-[99] pt-20 lg:pt-24 px-5 pb-6 flex flex-col justify-between xl:hidden dark:bg-[#121624] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="xl:flex xl:gap-x-5">
          <a
            onClick={toggleMenu}
            className="font-medium block text-base text-center rounded-xl p-4 mb-2.5 cursor-pointer bg-[#f8f9fa] dark:text-white dark:bg-[#f8f9fa1a] dark:bg-opacity-10"
          >
            About Us
          </a>
          <a
            onClick={toggleMenu}
            className="font-medium block text-base text-center rounded-xl p-4 mb-2.5 cursor-pointer bg-[#f8f9fa] dark:text-white dark:bg-[#f8f9fa1a] dark:bg-opacity-10"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
