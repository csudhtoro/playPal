"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import app from "@/shared/FirebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import signUp from "../api/auth/signup";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [inputs, setInputs] = useState({});
  const [submit, setSubmit] = useState(false);

  const storage = getStorage(app);
  //const router = useRouter();

  useEffect(() => {
    if (submit == true) {
      saveUser();
    }
  }, [submit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storageRef = ref(storage, "playPal/" + imgFile?.name);
    //console.log(imgFile);
    //save image selected to Firebase storage
    uploadBytes(storageRef, imgFile)
      .then((snapshot) => {
        //console.log("Uploaded a file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          setInputs((values) => ({ ...values, image: url }));
          setSubmit(true);
        });
      });
    //console.log("Inputs:", inputs);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const saveUser = async () => {
    const { result, error } = await signUp(
      inputs.email,
      inputs.password,
      inputs.name,
      inputs.image
    );

    if (error) {
      return console.log(error);
    }
    //console.log("Result:", result);
  };

  return (
    <section className="bg-slate-50 h-screen">
      {/**Background gradient */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-2xl sm:blur-3xl sm:-top-40"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 95% 61.6%, 99.5% 26.9%, 45.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 79.3%, 45.2% 44.5%, 87.5% 76.7%, 0.1% 60.9%, 17.9% 100%, 54.6% 76.8%, 70.1% 97.7%, 74.1% 64.1%)"
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/3 sm:translate-y-1/3 rotate-[15deg] bg-gradient-to-tr from-[#e05e1d] to-[#0356fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[45vh] sm:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <Image
            src="/logo2.png"
            alt="app logo"
            width={60}
            height={60}
            quality={75}
            className="w-16"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="passwordAgain"
                  id="passwordAgain"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="display-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="enter a display name"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/png"
                  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => setImgFile(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="bg-[#0356fc] w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
