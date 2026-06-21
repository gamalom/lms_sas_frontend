import Link from "next/link";
import MaterialIcon from "../material-icon";

const Navbar = () => {
  return (
    <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl gap-8 px-6 py-4 transition-all duration-200 ease-in-out lg:px-12">
        <div className="relative flex items-center">
          <Link href="/" className="text-slate-900">
            <MaterialIcon name="trackChanges" className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex-grow" />
        <div className="hidden items-center justify-center gap-6 md:flex">
          <Link
            href="/auth/login"
            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
          >
            log in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
          >
            Become an institute
          </Link>
        </div>
        <div className="relative flex items-center justify-center md:hidden">
          <button type="button" aria-label="Open menu">
            <MaterialIcon name="menu" className="h-6 w-6 text-slate-900" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
