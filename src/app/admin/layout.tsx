import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { signOut } from "@/auth"
import { PlusCircle, LayoutGrid, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold text-sm">
              PromptVault
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/admin" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                <LayoutGrid className="h-4 w-4 mr-1.5" />
                All Prompts
              </Link>
              <Link href="/admin/new" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                <PlusCircle className="h-4 w-4 mr-1.5" />
                New Prompt
              </Link>
            </nav>
          </div>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign out
            </Button>
          </form>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  )
}
