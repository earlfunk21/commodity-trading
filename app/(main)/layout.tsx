import AuthButtons from "@/app/(main)/_components/auth-buttons";
import Footer from "@/app/(main)/_components/footer";
import Logo from "@/app/(main)/_components/logo";
import NavMenu from "@/app/(main)/_components/nav-menu";
import NavigationSheet from "@/app/(main)/_components/navigation-sheet";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="fixed top-6 inset-x-0 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full shadow-md z-50">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4">
          <Logo />
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Suspense>
              <AuthButtons />
            </Suspense>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
      <div className="py-16" />
      {children}
      <Footer />
    </div>
  );
}
