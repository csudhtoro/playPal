import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-slate-900 body-font">
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
      <div className="flex flex-col items-center justify-center pt-20 pb-20 px-8">
        <h1 className="max-w-4xl text-4xl md:text-6xl font-bold text-black text-center mb-4 p-6 mx-auto space-x-4">
          Connect, Compete & Conquer{" "}
          <span className="font-bold text-[#0356fc]">Together!</span>
        </h1>
        <p className="text-center mt-8 mx-auto max-w-prose sm:text-lg text-slate-600 font-medium">
          Whether it&apos;s hiking, a night swim, or competitive game of
          basketball, meet your perfect activity partners with playPal.
        </p>
        <Link
          className="flex justify-center items-center gap-2 bg-[#0356fc] mt-16 px-4 py-5 sm:px-6 sm:py-6 text-[.9rem] text-white font-bold rounded-2xl h-9 sm:h-10 hover:bg-[#0339a3]"
          href="/registration"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center mx-auto">
        <Image
          className="object-cover object-center max-w-[50rem] w-3/4 p-4 sm:p-6 mb-10  rounded-xl ring-8 ring-slate-600/10 shadow-lg shadow-slate-400"
          alt="Placeholder Image"
          src="/images/screen1.png"
          width={400}
          height={400}
          unoptimized={true}
        />
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-16 mt-16 max-w-5xl ">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-3xl text-slate-900 sm:text-4xl">
              Post your passions, find your partners
            </h2>
            <p className="mt-4 text-lg text-slate-600 body-font">
              Embark on outdoor adventures together with ease.
            </p>
          </div>
        </div>
      </div>
      {/* steps */}
      <ol className="max-w-[50rem] my-8 space-y-4 pt-8 md:flex md:space-x-8 md:space-y-0 md:mx-auto md:px-8">
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-slate-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span className="text-sm font-semibold text-[#0356fc]">Step 1</span>
            <span className="text-xl font-semibold">
              Step into the adventure zone
            </span>
            <span className="mt-2 text-slate-700">
              Create your account in a heartbeat and unlock a world of thrilling
              possibilities!
            </span>
          </div>
        </li>
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-slate-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span className="text-sm font-semibold text-[#0356fc]">Step 2</span>
            <span className="text-xl font-semibold">
              Craft your next epic chapter
            </span>
            <span className="mt-2 text-slate-700">
              Dive into the action by creating a magnetic posting for your
              activity.
            </span>
          </div>
        </li>
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-slate-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span className="text-sm font-semibold text-[#0356fc]">Step 3</span>
            <span className="text-xl font-semibold">
              Anticipation builds, connections unfold
            </span>
            <span className="mt-2 text-slate-700">
              Sit back, relax, and let the thrill unfold as fellow enthusiasts
              join your journey.
            </span>
          </div>
        </li>
      </ol>
      <div className="flex flex-col items-center justify-center mx-auto mt-24 mb-10">
        <Image
          className="object-cover object-center max-w-[23rem] max-h-fit w-3/4 p-4 sm:p-6 mb-10 rounded-xl ring-8 ring-slate-600/10 shadow-lg shadow-slate-400"
          alt="Placeholder Image"
          src="/images/screen2.png"
          width={400}
          height={400}
          unoptimized={true}
        />
      </div>
    </section>
  );
}
