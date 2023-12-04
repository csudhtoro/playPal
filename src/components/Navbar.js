import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut, LogIn, Pencil } from "lucide-react";

const USER_IMAGE =
  "https://cdn-icons-png.flaticon.com/128/5178/5178994.png?uid=R124143615&ga=GA1.1.1996791833.1701550540&semt=ais";

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <div className="flex justify-between xl:justify-around p-6 rounded-xl mb-2 border-b border-slate-200">
      <Link href="/" className="flex items-center gap-2 sm:gap-4">
        <Image
          src="/logo2.png"
          alt="app logo"
          width={60}
          height={60}
          quality={75}
          className="w-10 sm:w-16"
        />{" "}
        <span className="sm:text-2xl text-[#0356fc] hover:text-[#0339a3] font-extrabold font-sans">
          playPal
        </span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        {session ? (
          <button
            className="bg-zinc-800 px-4 text-[.8rem] text-white font-bold rounded-full h-9 sm:h-10 hover:bg-zinc-900"
            onClick={() => router.push("/create-post")}
          >
            <span className="hidden sm:block"> Create New Post</span>{" "}
            <Pencil className="sm:hidden" size={18} />
          </button>
        ) : (
          ""
        )}
        {!session ? (
          <button
            className="bg-[#0356fc] text-[.8rem] text-white font-bold px-4 rounded-full h-9 sm:h-10 hover:bg-[#0339a3]"
            onClick={() => signIn()}
          >
            <span className="hidden sm:block">Sign In</span>{" "}
            <LogIn className="sm:hidden" size={18} />
          </button>
        ) : (
          <>
            <button
              className="bg-[#0356fc] text-[.8rem] text-white font-bold px-4 rounded-full h-9 sm:h-10 hover:hover:bg-[#0339a3]"
              onClick={() => signOut()}
            >
              <span className="hidden sm:block">Sign Out</span>{" "}
              <LogOut className="sm:hidden" size={18} />
            </button>
            <Image
              src={session.user.image ? session?.user?.image : USER_IMAGE}
              alt="user_pic"
              width={47}
              height={47}
              className="w-9 sm:w-10 rounded-full cursor-pointer hover:scale-105"
              onClick={() => router.push("/profile")}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
