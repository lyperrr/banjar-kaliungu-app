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
import { servicesData } from "@/data/servicesData";
import { motion } from "framer-motion";
import { itemVariants, containerVariants, itemStatCenter } from "@/lib/animation";

const ServiceCard = ({ title, description, serviceId }) => {
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
          size="lg"
          className="group overflow-hidden bg-primary/10 hover:bg-transparent border-primary ml-auto"
          asChild
        >
          <Link
            to={`/pelayanan/${serviceId}`}
            className="relative inline-flex items-center gap-2 px-6 py-2"
          >
            {/* Background animasi */}
            <span className="bg-primary absolute inset-0 z-0 -translate-x-[90%] rounded-sm transition-transform duration-500 ease-in-out group-hover:translate-x-0" />

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
  return (
    <motion.section
      id="pelayanan"
      className="container py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="text-center mb-8">
        <motion.div variants={itemVariants}>
          <Badge variant="tertiary" className="uppercase">
            Pelayanan Terpadu
          </Badge>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="h2" className="sm:max-w-2xl mx-auto">
            Pusat Pelayanan Banjar Kaliungu Kaja
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="muted" className="sm:max-w-3xl mx-auto">
            Pusat pelayanan resmi banjar yang mendukung kebutuhan administrasi,
            pelaksanaan adat, serta kegiatan sosial masyarakat.
          </Typography>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {servicesData.slice(0, 4).map((svc, idx) => (
          <motion.div key={idx} variants={itemStatCenter}>
            <ServiceCard
              serviceId={svc.id}
              title={svc.title}
              description={svc.shortDescription}
            />
          </motion.div>
        ))}
      </div>

      {/* <div className="mt-8 flex justify-center"> */}
      <motion.div
        variants={itemStatCenter}
        className="mt-8 flex justify-center"
      >
        <motion.div
          variants={itemStatCenter}
          className="w-full md:w-2/3 lg:w-1/2"
        >
          <ServiceCard
            serviceId={servicesData[4].id}
            title={servicesData[4].title}
            description={servicesData[4].shortDescription}
          />
        </motion.div>
      </motion.div>
      {/* </div> */}
    </motion.section>
  );
};

export default Service;
