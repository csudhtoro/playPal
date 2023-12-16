import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="mt-10">
      <footer className="p-4  md:p-8 lg:p-10">
        <div className="flex flex-col gap-2 px-6 sm:px-16 mx-auto max-w-[120rem] lg:max-w-screen-xl text-center">
          <ul className="flex flex-wrap justify-center items-center mb-1 text-gray-600">
            <li>
              <Link href="/" className="text-sm mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sm mr-4 hover:underline md:mr-6">
                Premium
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sm mr-4 hover:underline md:mr-6 ">
                Campaigns
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sm mr-4 hover:underline md:mr-6">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sm mr-4 hover:underline md:mr-6">
                Affiliate Program
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sm mr-4 hover:underline md:mr-6">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sm mr-4 hover:underline md:mr-6">
                Contact
              </Link>
            </li>
          </ul>
          <p className="text-xs text-gray-600">
            Icons by{" "}
            <Link href="https://www.freepik.com" target="_blank">
              <span className="text-blue-900 font-bold">Freepik</span>{" "}
            </Link>
          </p>
          <p className="text-xs text-gray-600">
            Image provided by{" "}
            <Link href="https://www.unsplash.com" target="_blank">
              <span className="text-blue-900 font-bold">Unsplash</span>{" "}
            </Link>
          </p>
          <span className="text-sm text-gray-600 sm:text-center">
            © 2023-2024{" "}
            <Link href="/" className="hover:underline">
              playPal™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
