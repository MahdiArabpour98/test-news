import SwitchTheme from "@/components/themes/switch-theme";
import { Button } from "@/components/ui/button";
import { heroBg } from "@/constants/images";
import { routes } from "@/routes/routes";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight dark:text-white md:text-5xl xl:text-6xl">
          جدید ترین اخبار و مقالات ایران و جهان
        </h1>
        <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
          اخبار داخلی و بین‌المللی، تحلیل‌ها و گزارش‌های ویژه از رویدادهای ایران
          و جهان تحلیل‌های روز، گزارش‌های ویژه و پوشش خبری رویدادهای ایران و
          جهان.
        </p>
        <div className="flex items-center gap-2">
          <Link href={routes.root.news.root}>
            <Button className="h-10">همه اخبار</Button>
          </Link>
          <Link href={routes.admin.dashboard}>
            <Button className="h-10 border border-gray-700 bg-transparent text-foreground hover:bg-gray-700 hover:text-primary">
              پنل ادمین
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          <SwitchTheme />
        </div>
      </div>
      <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
        <Image width={720} height={480} src={heroBg} alt="news" />
      </div>
    </div>
  );
};

export default Hero;
