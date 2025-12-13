import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "/logo-kaliungu.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  House,
  HandHelping,
  HelpingHand,
  Newspaper,
  Landmark,
  Gavel,
  ChevronDown,
  Phone,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navLinks = [
    {
      label: "Beranda",
      icon: House,
      link: "/",
    },
    {
      label: "Pelayanan",
      icon: HelpingHand,
      children: [
        { label: "Permohonan Surat", link: "/pelayanan/permohonan-surat" },
        {
          label: "Pendaftaran Kelahiran",
          link: "/pelayanan/pendaftaran-kelahiran",
        },
        {
          label: "Pendaftaran Kematian",
          link: "/pelayanan/pendaftaran-kematian",
        },
      ],
    },
    {
      label: "Berita",
      icon: Newspaper,
      link: "/berita",
    },
    {
      label: "Sejarah",
      icon: Landmark,
      link: "/sejarah",
    },
    {
      label: "Awig-Awig",
      icon: Gavel,
      link: "/awig-awig",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (children) => {
    return children?.some((child) => location.pathname === child.link);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <header className="fixed top-0 bg-background shadow-md w-full left-0 z-50">
      <nav className="container">
        <div className="flex justify-between items-center py-2 font-poppins">
          <Link to="/">
            <img
              src={Logo}
              alt="Banjar Kaliungu Kaja"
              className="size-14 lg:size-20"
            />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-transparent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>

          {/* Desktop Menu */}
          <div className="hidden md:flex h-full bg-background">
            <ul className="flex items-center gap-1">
              {navLinks.map((navItem, index) => {
                const Icon = navItem.icon;

                if (navItem.children) {
                  const parentActive = isParentActive(navItem.children);
                  return (
                    <li key={index} className="relative group">
                      <Link
                        to={navItem.link}
                        className={cn(
                          "relative inline-flex items-center gap-2 px-2 py-1 text-base font-medium rounded-lg transition-colors duration-200",
                          parentActive
                            ? "text-accent"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="font-medium">{navItem.label}</span>
                        <ChevronDown className="size-4 transition-transform duration-200 group-hover:rotate-180" />
                      </Link>

                      {/* Desktop Dropdown Menu */}
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 w-64 rounded-lg bg-white shadow-lg border border-primary/20 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out overflow-hidden z-50"
                      >
                        {navItem.children.map((child, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                          >
                            <Link
                              to={child.link}
                              className={`block px-4 py-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-150 text-base font-medium border-b-2 border-primary/20 last:border-0 ${
                                isActive(child.link)
                                  ? "bg-primary text-primary-foreground"
                                  : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <Link
                      to={navItem.link}
                      className={cn(
                        "relative inline-flex items-center gap-2 px-2 py-1 text-base font-medium transition-colors duration-200",
                        isActive(navItem.link)
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {navItem.label}

                      {/* underline */}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-300",
                          isActive(navItem.link) && "scale-x-100"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
              <Button size="lg" className="rounded-full text-accent px-6! ml-3">
                <Phone />
                Pengaduan
              </Button>
            </ul>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[72px] bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute left-0 top-full w-full z-50 bg-background border-t shadow-lg"
            >
              <div className="py-4 px-4">
                <ul className="flex flex-col gap-3">
                  {navLinks.map((navItem, index) => {
                    const Icon = navItem.icon;

                    if (navItem.children) {
                      const isOpen = openDropdown === index;
                      const parentActive = isParentActive(navItem.children);
                      return (
                        <motion.li
                          key={index}
                          className="flex flex-col"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Button
                            variant="ghost"
                            className={`font-medium py-6 w-full text-left justify-start ${
                              parentActive
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "hover:text-primary-foreground hover:bg-primary/70! hover:shadow-sm"
                            }`}
                            onClick={() => toggleDropdown(index)}
                            asChild
                          >
                            <button>
                              <Icon className="size-5 shrink-0" />
                              <span className="flex-1 text-base">
                                {navItem.label}
                              </span>
                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                              >
                                <ChevronDown className="size-5" />
                              </motion.div>
                            </button>
                          </Button>

                          {/* Mobile Dropdown with Framer Motion */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pt-2 space-y-1">
                                  {navItem.children.map((child, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.2,
                                        delay: idx * 0.05,
                                      }}
                                    >
                                      <Link
                                        to={child.link}
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          setOpenDropdown(null);
                                        }}
                                        className={`
                                          block px-4 py-3 rounded-lg
                                         ease-in-out
                                          text-base font-medium
                                          border-l-2
                                          ${
                                            isActive(child.link)
                                              ? "bg-primary/10 text-primary border-primary font-semibold"
                                              : "border-transparent hover:border-gray-300 hover:bg-primary/70 hover:text-primary-foreground"
                                          }
                                        `}
                                      >
                                        <div className="text-left mx-auto w-4/5">
                                          {child.label}
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      );
                    }
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Button
                          variant="ghost"
                          className={`font-medium w-full py-6 text-left justify-start ${
                            isActive(navItem.link)
                              ? "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/70! shadow-md"
                              : "hover:shadow-sm hover:text-primary-foreground hover:bg-primary/70!"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                          asChild
                        >
                          <Link to={navItem.link}>
                            <Icon className="size-5 shrink-0" />
                            <span className="text-base">{navItem.label}</span>
                          </Link>
                        </Button>
                      </motion.li>
                    );
                  })}
                  <Button size="lg" className="text-accent px-6!">
                    <Phone />
                    Pengaduan
                  </Button>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
