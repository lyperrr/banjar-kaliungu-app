import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Mail,
  Info,
  ListChecks,
  ClipboardList,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { servicesData } from "@/data/servicesData";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation";

const DetailServices = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s.id === serviceName);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} - Banjar Kaliungu Kaja`;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          service.shortDescription || service.description?.substring(0, 160)
        );
      }

      // Update keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `Banjar Kaliungu Kaja, ${service.category}, ${service.title}, layanan, Bali`
        );
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute(
          "content",
          `${service.title} - Banjar Kaliungu Kaja`
        );
      }

      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          service.shortDescription || service.description?.substring(0, 160)
        );
      }
    } else {
      document.title = "Layanan Tidak Ditemukan - Banjar Kaliungu Kaja";
    }
  }, [service]);

  const contactInformation = [
    {
      title: "Jadwal",
      content: service?.schedule,
      icon: Clock,
    },
    {
      title: "Lokasi",
      content: service?.location,
      icon: MapPin,
    },
    {
      title: "Telepon",
      content: service?.contact,
      icon: Phone,
    },
    {
      title: "Email",
      content: service?.email,
      icon: Mail,
    },
  ];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center  px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <Typography variant="h3">Layanan tidak ditemukan</Typography>
            <Link to="/">
              <Button>Kembali ke Beranda</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <motion.div
        className="bg-primary border-b"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container py-12">
          <motion.div className="" variants={itemVariants}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
                <div className="flex items-center justify-between gap-4 w-full sm:w-auto sm:gap-0">
                  <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="text-primary-foreground size-9 bg-transparent hover:bg-transparent hover:text-primary-foreground/90 cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                  </Button>
                  <Badge variant="tertiary" className="uppercase sm:hidden">
                    {service.category}
                  </Badge>
                </div>

                <Typography variant="h2" className="text-primary-foreground">
                  {service.title}
                </Typography>
              </div>
              <Badge
                variant="tertiary"
                className="uppercase hidden sm:inline-block"
              >
                {service.category}
              </Badge>
            </div>

            <Typography variant="p" className="text-primary-foreground/80">
              {service.subtitle}
            </Typography>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="container py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* About */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="size-5 text-accent" />
                    Tentang Layanan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography variant="p" className="text-justify">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="size-5 text-accent" />
                    Layanan yang Tersedia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.services.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="inline-block size-1.5 rounded-full bg-primary shrink-0"></span>
                        <Typography variant="p" className="m-0!">
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="size-5 text-accent" />
                    Persyaratan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {service.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                          {idx + 1}
                        </div>
                        <Typography variant="p" className="m-0!">
                          {req}
                        </Typography>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 lg:sticky lg:top-6 lg:self-start h-fit">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Contact className="size-5 text-accent" />
                    Informasi Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {contactInformation.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <item.icon className="size-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm mb-1">
                            {item.title}
                          </div>
                          <div
                            className={`text-sm ${
                              item.title === "Email" ? "wrap-break-word" : ""
                            }`}
                          >
                            {item.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-2 cursor-pointer">
                    <Phone className="size-4" />
                    Hubungi Kami
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailServices;
