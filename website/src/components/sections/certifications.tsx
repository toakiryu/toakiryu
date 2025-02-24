import { cn } from "@/lib/utils";

import { FlickeringGrid } from "../magicui/flickering-grid";
import { Marquee } from "../magicui/marquee";

import { IconCertificate } from "@tabler/icons-react";

import certifications from "../../../certifications";
import { certificationType } from "@/types/certifications";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "@/components/custom/image";

const firstRow = certifications.slice(0, certifications.length / 2);
const secondRow = certifications.slice(certifications.length / 2);

const ReviewCard = ({ props }: { props: certificationType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <figure
          className={cn(
            "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
            // light styles
            "bg-zinc-900/[.01] hover:bg-zinc-900/[.05] border-zinc-800/[.1]",
            // dark styles
            "dark:bg-zinc-900/[.1] dark:hover:bg-zinc-900/[.5] dark:border-zinc-800"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            {props.icon ? (
              <props.icon size={32} />
            ) : (
              <IconCertificate size={32} />
            )}
            <div className="flex flex-col w-full">
              <figcaption className="text-sm font-medium dark:text-white truncate">
                {props.name}
              </figcaption>
              <p className="text-xs font-medium dark:text-white/40">
                {props.issuer}
              </p>
            </div>
          </div>
          <blockquote className="flex flex-wrap gap-1 w-full max-h-24 mt-2">
            {props.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-zinc-900/[.06] dark:bg-zinc-800/[.4] px-2 py-1 rounded-full text-sm opacity-75 truncate"
              >
                {skill}
              </span>
            ))}
          </blockquote>
        </figure>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.name}</DialogTitle>
          <DialogDescription>
            {props.issuer} - {props.issueDate}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-1">
          {props.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-zinc-900/[.06] dark:bg-zinc-800/[.4] px-2 py-1 rounded-full text-sm opacity-75 truncate"
            >
              {skill}
            </span>
          ))}
        </div>
        <hr />
        <Image
          alt="certifications image"
          src={`/wp-content/uploads/certifications/${props.id}.webp`}
          className="max-w-full w-auto h-auto border rounded-2xl overflow-hidden"
        />
      </DialogContent>
    </Dialog>
  );
};

function SectionCertifications() {
  return (
    <section id="certifications">
      <div className="relative container max-w-5xl px-4">
        <div className="z-0 text-center relative mx-auto border-x border-t overflow-hidden p-2 py-8 md:p-12">
          <h2 className="text-sm text-muted-foreground text-balance font-semibold tracking-tight uppercase">
            Certifications
          </h2>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-background dark:from-background -z-10 from-50%" />
          <FlickeringGrid
            className="w-full h-full -z-20 absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
        <div className="border-x border-t">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee repeat={8} pauseOnHover className="[--duration:8s]">
              {firstRow.map((certification, index) => (
                <ReviewCard key={index} props={certification} />
              ))}
            </Marquee>
            <Marquee
              repeat={8}
              reverse
              pauseOnHover
              className="[--duration:8s]"
            >
              {secondRow.map((certification, index) => (
                <ReviewCard key={index} props={certification} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionCertifications;
