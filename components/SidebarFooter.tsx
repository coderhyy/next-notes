import { auth, signIn, signOut } from "@/auth";

interface SignInProps {
  provider?: string;
  [x: string]: any;
}

function SignIn({ provider, ...props }: SignInProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

function SignOut(props: Record<string, any>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default async function SidebarFooter() {
  const session = await auth();
  return (
    <div
      style={{
        padding: "16px",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {session?.user ? (
        <span>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
