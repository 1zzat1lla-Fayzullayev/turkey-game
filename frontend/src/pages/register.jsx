/* eslint-disable react/no-unescaped-entities */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUserGraduate,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherForm from "./teacherform";
import StudentForm from "./studentform";

function Register() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      navigate("/");
    }
  }, [navigate]);

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/");
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      handleCloseModal();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div
      id="modal-background"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] px-[20px] md:px-0"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white dark:bg-[#121624] p-8 rounded-lg shadow-lg max-w-md w-full text-center relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-600"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faTimes} className="text-2xl" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-[#2ecc71] dark:text-white">
          Roʻyxatdan oʻtish yoki Kirish
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Roʻyxatdan oʻtish uchun oʻz boʻlimingizni tanlang yoki kiring:
        </p>

        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={() => setSelectedRole("teacher")}
            className={`flex flex-col items-center p-4 bg-[#f8f9fa] dark:bg-[#f8f9fa1a] rounded-lg ${
              selectedRole === "teacher" ? "ring-4 ring-[#2ecc71]" : ""
            } transition duration-300`}
            aria-pressed={selectedRole === "teacher"}
          >
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="text-3xl text-[#2ecc71] mb-2"
            />
            <span className="text-base font-medium text-gray-800 dark:text-white">
              O'qituvchi
            </span>
          </button>
          <button
            onClick={() => setSelectedRole("student")}
            className={`flex flex-col items-center p-4 bg-[#f8f9fa] dark:bg-[#f8f9fa1a] rounded-lg ${
              selectedRole === "student" ? "ring-4 ring-[#2ecc71]" : ""
            } transition duration-300`}
            aria-pressed={selectedRole === "student"}
          >
            <FontAwesomeIcon
              icon={faUserGraduate}
              className="text-3xl text-[#2ecc71] mb-2"
            />
            <span className="text-base font-medium text-gray-800 dark:text-white">
              O'quvchi
            </span>
          </button>
        </div>

        {selectedRole === "teacher" && <TeacherForm />}
        {selectedRole === "student" && <StudentForm />}

      </div>
    </div>
  );
}

export default Register;
