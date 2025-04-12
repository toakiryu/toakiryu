import React from "react";
import Link from "../custom/link";
import Image from "../custom/image";

export type socialLinksType = {
  name: string;
  href?: string;
  src: string;
};

function SectionSocials({ socialLinks }: { socialLinks: socialLinksType[] }) {
  return (
    <section id="socials">
      <div className="relative container max-w-5xl px-4">
        <div className="border-x border-t">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            {socialLinks.map(({ name, href, src }, index) => (
              <div
                key={index}
                className="flex group items-center justify-center p-4 border-r border-t last:border-r-0 sm:last:border-r md:nth-[3n]:border-r md:nth-[6n]:border-r-0 md:nth-3:border-r nth-[-n+2]:border-t-0 sm:nth-[-n+3]:border-t-0 sm:nth-[3n]:border-r-0 md:nth-[-n+6]:border-t-0 nth-[2n]:border-r-0 sm:nth-[2n]:border-r"
              >
                {href ? (
                  <Link href={href}>
                    <Image
                      alt={name}
                      src={src}
                      height={34}
                      className="brightness-0 invert-[30%]"
                    />
                  </Link>
                ) : (
                  <Image
                    alt={name}
                    src={src}
                    height={34}
                    className="brightness-0 invert-[30%]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionSocials;
