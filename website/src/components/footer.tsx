import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandX,
  IconBrandYoutube,
  IconCode,
} from "@tabler/icons-react";
import { Button } from "@/src/components/ui/shadcn/button";
import { Label } from "@/src/components/ui/shadcn/label";
import { Input } from "@/src/components/ui/shadcn/input";
import { LinkButton } from "@/src/components/custom/link-button";
import { LinkText } from "@/src/components/custom/link-text";

export default function MenuContent() {
  return (
    <footer className="relative w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="group relative mb-8 size-[50px] sm:size-[70px] rounded-full overflow-hidden">
            <img
              src="/wp-content/brand/toakiryu/icon.256x256.webp"
              alt="logo"
              className=""
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center hover:bg-primary/50 opacity-0 hover:opacity-100 transition-all duration-100 ease-linear">
              <IconCode className="size-[1vw]" />
            </div>
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <LinkText
              href="/"
              isDefClass={false}
              className="hover:text-primary"
            >
              Home
            </LinkText>
            <LinkText
              href="/about"
              isDefClass={false}
              className="hover:text-primary"
            >
              About
            </LinkText>
            <a href="#" className="hover:text-primary">
              Services
            </a>
            <a href="#" className="hover:text-primary">
              Products
            </a>
            <LinkText
              href="/contact"
              isDefClass={false}
              className="hover:text-primary"
            >
              Contact
            </LinkText>
          </nav>
          <div className="mb-8 flex space-x-4">
            <LinkButton
              href="https://x.com/toakiryu"
              variant="secondary"
              size="icon"
            >
              <IconBrandX className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </LinkButton>
            <LinkButton
              href="https://github.com/toakiryu"
              variant="secondary"
              size="icon"
            >
              <IconBrandGithub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </LinkButton>
            <LinkButton
              href="https://discord.com/users/990984460365365258"
              variant="secondary"
              size="icon"
            >
              <IconBrandDiscord className="h-4 w-4" />
              <span className="sr-only">Discord</span>
            </LinkButton>
            <LinkButton
              href="https://www.youtube.com/@toakiryu"
              variant="secondary"
              size="icon"
            >
              <IconBrandYoutube className="h-4 w-4" />
              <span className="sr-only">YouTube</span>
            </LinkButton>
          </div>
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-none"
                />
              </div>
              <Button type="submit" className="rounded-none">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-lg text-muted-foreground">
              © 2009 ~ {new Date().getFullYear()} Toa Kiryu. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
