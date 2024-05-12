import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import ShopKart from "./_components/SvgFiles";
export default async function Home() {
  // const hello = await api.auth.signup({
  //   name: "ravi",
  //   email: "hello@gmail.com",
  //   password: "helloravi",
  // });
  return (
    <>
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

        <div className="ml-[10%] mr-[10%] mt-5 flex justify-between">
          <h1 className="text-xl font-bold">ECOMMERCE</h1>
          <button className="border-1 rounded-sm border-black bg-black p-2 text-white hover:border-none  hover:bg-green-700 hover:text-black ">
            Get Started
          </button>
        </div>

        <div className="mt-[40%] grid grid-cols-1 justify-items-center text-center md:mt-[10%] ">
          <h2 className="text-light text-4xl md:text-5xl ">
            A smarter way to Shop
          </h2>
          <p className="ml-[10%] mr-[10%] mt-5 text-lg font-light md:mt-1 md:font-normal ">
            Discover an eCommerce paradise where all your shopping desires come
            to life! Browse through a vast array of products and choose what
            delights you most.
          </p>

          <div>
            <Link href="/login">
              <button className="group relative mt-5 inline-flex items-center overflow-hidden rounded-full border-2 border-indigo-600 px-12 py-3 text-lg font-medium text-indigo-600 hover:bg-gray-50 hover:text-white ">
                <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-indigo-600 opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-300 group-hover:translate-x-0">
                  {/* <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg> */}
                  <ShopKart />
                </span>
                <span className="relative">Get Shopping</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }

{
  /* <a
  href="#_"
  className="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-indigo-600 px-12 py-3 text-lg font-medium text-indigo-600 hover:bg-gray-50 hover:text-white"
>
  <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-indigo-600 opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
  <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-300 group-hover:translate-x-0">
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      ></path>
    </svg>
  </span>
  <span className="relative">Button Text</span>
</a>; */
}
