import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Logo from "/logo-kaliungu.png";
import Typography from "@/components/ui/typography";
import { servicesData } from "@/data/servicesData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const quickLinks = [
    {
      name: "Beranda",
      link: "/",
    },
    {
      name: "Berita",
      link: "/berita",
    },
    {
      name: "Sejarah",
      link: "/sejarah",
    },
    {
      name: "Awig-Awig",
      link: "/awig-awig",
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      icon: Facebook,
      link: "",
    },
    {
      name: "Instagram",
      icon: Instagram,
      link: "",
    },
    {
      name: "Email",
      icon: Mail,
      link: "",
    },
  ];
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-10 lg:py-20">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* BRAND */}
          <div className="space-y-4 lg:col-span-4">
            <Link to="/">
              <img
                src={Logo}
                alt="Banjar Kaliungu Kaja"
                className="size-14 lg:size-20"
              />
            </Link>

            <Typography variant="p" className="text-muted">
              Website resmi Banjar Kaliungu Kaja sebagai pusat informasi,
              pelayanan masyarakat, dan kegiatan adat.
            </Typography>

            {/* SOCIAL MEDIA */}
            <div className="flex gap-3">
              {socialMedia.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    to={social.link}
                    key={index}
                    className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent transition"
                  >
                    <Icon className="size-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:col-span-8">
            {/* ALAMAT & KONTAK */}
            <div className="space-y-4 sm:col-span-6 lg:col-span-4">
              <Typography variant="h4" className="font-semibold text-accent">
                Kontak & Alamat
              </Typography>

              <div className="flex gap-3 text-muted text-sm">
                <MapPin className="shrink-0 size-5" />
                <Typography
                  variant="p"
                  className="m-0! text-primary-foreground"
                >
                  Jl. Belimbing No.39, Dangin Puri Kaja Denpasar Utara, Bali
                  80232
                </Typography>
              </div>

              <div className="flex gap-3 text-muted text-sm">
                <Phone className="shrink-0 size-5" />
                <Typography
                  variant="p"
                  className="m-0! text-primary-foreground"
                >
                  +62 813-5359-2271
                </Typography>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="space-y-4 sm:col-span-6 lg:col-span-3">
              <Typography variant="h4" className="font-semibold text-accent">
                Tautan Cepat
              </Typography>
              <ul className="space-y-2 text-sm text-muted">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-accent transition"
                          : "text-primary-foreground/80 hover:text-primary-foreground transition"
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <details className="group">
                    <summary
                      className={`cursor-pointer transition-colors duration-300 ease-in-out flex items-center gap-2 ${
                        location.pathname.startsWith("/pelayanan")
                          ? "text-accent"
                          : "text-primary-foreground/80 hover:text-primary-foreground group-open:text-primary-foreground"
                      }`}
                    >
                      Pelayanan
                      <ChevronDown className="size-4 group-open:rotate-180 transition-transform duration-300 ease-in-out" />
                    </summary>
                    <ul className="mt-2 ml-4 space-y-1">
                      {servicesData.map((service, index) => (
                        <li key={index}>
                          <NavLink
                            to={`/pelayanan/${service.id}`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-accent transition"
                                : "text-primary-foreground/80 hover:text-primary-foreground transition"
                            }
                          >
                            {service.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </ul>
            </div>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-border/10 sm:col-span-12 lg:col-span-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4884.303317151486!2d115.21729567592055!3d-8.651390788007609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409dc703eb0f%3A0x6279fdd88211bde4!2sBr.%20Kaliungu%20Kaja!5e1!3m2!1sid!2sid!4v1765876252284!5m2!1sid!2sid"
                className="size-full min-h-72"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <Typography variant="muted" className="text-muted">
            © {currentYear}{" "}
            <span className="font-light text-accent">
              El Develop – Patras Dev
            </span>
            . All Rights Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
