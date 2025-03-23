import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-md">
        <span className="font-bold text-white text-xl">SC</span>
      </div>
      <div className="font-bold text-xl hidden sm:block">
        <span className="text-green-600 dark:text-green-400">Skill</span>
        <span className="text-green-700 dark:text-green-300">Chain</span>
      </div>
    </Link>
  )
}

