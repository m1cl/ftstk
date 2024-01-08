import {SignIn, SignOutButton} from "@clerk/nextjs";
// import { CreateImage } from "./_components/create-image";
import Link from "next/link";
import {CreatePost} from "~/app/_components/create-post";
import {getServerAuthSession} from "~/server/auth";
import {api} from "~/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[grey] to-[darkgrey] ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        <CreatePost />
        <div className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}

// async function UploadImage() {
//   return (
//     <div className="w-full max-w-xs">
//       <CreateImage />
//     </div>
//   );
// }
async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
