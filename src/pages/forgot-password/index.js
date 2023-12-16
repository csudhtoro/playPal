import React, { useState } from "react";
import resetEmail from "../api/auth/forgotPassword";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const { result, error } = await resetEmail(email);
    if (error) {
      return console.log(error);
    }

    // else successful
    //console.log(result);
    return router.push("/");
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[45vh] sm:h-screen max-w-screen-xl lg:py-16">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Forgot Password
            </h2>
            <form
              className="mt-8 space-y-6"
              action="#"
              disabled={!email}
              onSubmit={handlePasswordReset}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto"
              >
                Send Forgot Password Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
