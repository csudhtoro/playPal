import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut, LogIn, Pencil } from "lucide-react";

const USER_IMAGE =
  "https://cdn-icons-png.flaticon.com/128/1144/1144709.png?ga=GA1.1.898338224.1699314617&semt=ais";

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  //console.log("Session", session);
  return (
    <div className="flex justify-between p-6 border-b-[2px] border-gray-300 rounded-xl">
      <Link href="/" className="flex items-center gap-2 sm:gap-4">
        <Image
          src="/logo.png"
          alt="app logo"
          width={60}
          height={60}
          quality={75}
          className="w-10 sm:w-16"
        />{" "}
        <span className="sm:text-2xl text-orange-600 font-bold">playPal</span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        {session ? (
          <button
            className="bg-zinc-800 px-4 text-[.7rem] text-white font-semibold rounded-full h-9 sm:h-10 hover:bg-zinc-900"
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
            className="bg-orange-600 text-[.7rem] text-white font-semibold px-4 rounded-full sm:h-10 hover:bg-orange-700"
            onClick={() => signIn()}
          >
            <span className="hidden sm:block">Sign In</span>{" "}
            <LogIn className="sm:hidden" size={18} />
          </button>
        ) : (
          <>
            <button
              className="bg-orange-600 text-[.7rem] text-white font-semibold px-4 rounded-full h-9 sm:h-10 hover:bg-orange-700"
              onClick={() => signOut()}
            >
              <span className="hidden sm:block">Sign Out</span>{" "}
              <LogOut className="sm:hidden" size={18} />
            </button>
            <Image
              src={session ? session?.user?.image : USER_IMAGE}
              alt="user_pic"
              width={47}
              height={47}
              className="w-9 sm:w-10 rounded-full"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
