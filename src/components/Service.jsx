import React from "react";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";

const ServiceCard = ({ title, description }) => {
  return (
    <Card className="border border-primary/30 rounded-lg shadow-sm shadow-primary hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex gap-4 items-start px-6">
        <div className="w-14 h-14 rounded-md bg-accent flex items-center justify-center text-primary-foreground size-14">
          <Users className="size-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-2xl text-left font-bold">
            {title}
          </CardTitle>
          <CardDescription className="mt-1 text-left line-clamp-2">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center px-6">
        <Button
          variant="outline"
          size="sm"
          className="group overflow-hidden bg-primary/10 hover:bg-transparent border-primary rounded-full ml-auto"
          asChild
        >
          <Link
            to="/"
            className="relative inline-flex items-center gap-2 px-6 py-2"
          >
            {/* Background animasi */}
            <span className="bg-primary absolute inset-0 z-0 -translate-x-[90%] rounded-full transition-transform duration-500 ease-in-out group-hover:translate-x-0" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2 group-hover:text-primary-foreground">
              Selengkapnya
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Service = () => {
  const services = [
    {
      title: "POSYANDU",
      description:
        "Posyandu adalah layanan kesehatan masyarakat yang menyediakan pemeriksaan balita, imunisasi, penimbangan, dan edukasi kesehatan",
    },
    {
      title: "PECALANG",
      description:
        "Pecalang adalah petugas keamanan tradisional di Bali yang bertugas menjaga ketertiban dan keamanan di lingkungan banjar",
    },
    {
      title: "PAUD",
      description:
        "PAUD adalah lembaga pendidikan yang menyediakan pembelajaran bagi anak usia dini untuk mengembangkan potensi mereka secara optimal",
    },
    {
      title: "SEKA GONG",
      description:
        "Seka Gong adalah kelompok seni tradisional Bali yang memainkan alat musik gamelan untuk mengiringi upacara adat dan pertunjukan seni",
    },
    {
      title: "SEKA SHANTI",
      description:
        "Seka Shanti adalah kelompok pemuda di banjar yang berperan aktif dalam kegiatan sosial, budaya, dan keagamaan di komunitasnya",
    },
  ];

  return (
    <section className="container py-10">
      <div className="text-center mb-8">
        <Badge variant="tertiary" className="uppercase">
          Pelayanan Terpadu
        </Badge>
        <Typography variant="h2" className="sm:max-w-2xl mx-auto">
          Pusat Pelayanan Banjar Kaliungu Kaja
        </Typography>
        <Typography variant="muted" className="sm:max-w-3xl mx-auto">
          Pusat pelayanan resmi banjar yang mendukung kebutuhan administrasi,
          pelaksanaan adat, serta kegiatan sosial masyarakat.
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.slice(0, 4).map((svc, idx) => (
          <ServiceCard
            key={idx}
            title={svc.title}
            description={svc.description}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <ServiceCard
            title={services[4].title}
            description={services[4].description}
          />
        </div>
      </div>
    </section>
  );
};

export default Service;
