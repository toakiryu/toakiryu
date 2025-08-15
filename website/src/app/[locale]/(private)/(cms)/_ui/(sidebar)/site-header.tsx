import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/src/components/ui/shadcn/button";
import { Separator } from "@/src/components/ui/shadcn/separator";
import { SidebarTrigger } from "@/src/components/ui/shadcn/sidebar";
import { LinkText } from "@/src/components/custom/link-text";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            asChild
          >
            <LinkText
              href="https://github.com/toakiryu/toakiryu"
              isDefClass={false}
            >
              <IconBrandGithub />
              GitHub
            </LinkText>
          </Button>
        </div>
      </div>
    </header>
  );
}
