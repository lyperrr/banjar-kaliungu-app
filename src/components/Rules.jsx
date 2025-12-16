import React from "react";
import { Download } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

const RuleCard = ({ number, title, description }) => (
  <Card className="border border-accent/25 rounded-lg shadow-sm p-0 z-10">
    <CardHeader className="px-6 py-6 flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div className="flex-1 text-left">
        <div className="text-base font-bold uppercase">{title}</div>
        <CardDescription className="mt-2 text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </div>
    </CardHeader>
  </Card>
);

const Rules = () => {
  const rules = [
    {
      number: 1,
      title: "Rules 1",
      description: "keterangan rules 1",
    },
    {
      number: 2,
      title: "Rules 2",
      description: "Keterangan rules 2",
    },
    {
      number: 3,
      title: "Rules 3",
      description: "Keterangan  rules 3",
    },
    {
      number: 4,
      title: "Rules 4",
      description: "Keterangan rules 4",
    },
  ];

  return (
    <section className="container py-10 relative">
      <div className="text-center mb-8">
        <Badge variant="tertiary" className="uppercase">
          awig-awig banjar
        </Badge>
        <Typography variant="h2" className="sm:max-w-2xl mx-auto">
          Awig-Awig Banjar Kaliungu Kaja
        </Typography>
        <Typography variant="muted" className="sm:max-w-3xl mx-auto">
          Pedoman adat Banjar Kaliungu Kaja yang mengatur tata kehidupan krama,
          pelaksanaan kewajiban adat, serta menjaga keharmonisan dan kebersamaan
          banjar.
        </Typography>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center max-w-5xl mx-auto">
        {/* Top-left */}
        <div className="">
          <RuleCard {...rules[0]} />
        </div>

        {/* Top-right */}
        <div className="">
          <RuleCard {...rules[1]} />
        </div>

        {/* Bottom-left */}
        <div className="">
          <RuleCard {...rules[2]} />
        </div>

        {/* Bottom-right */}
        <div className="">
          <RuleCard {...rules[3]} />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Typography variant="muted" className="mb-3">
          klik tombol dibawah ini agar anda bisa melihat awig - awig banjar
          kaliungu kaja lebih lengkap
        </Typography>
        <Button
          variant="default"
          size="lg"
          className="rounded-full text-primary-foreground hover:text-accent cursor-pointer"
        >
          <Download />
          Download
        </Button>
      </div>
    </section>
  );
};

export default Rules;
