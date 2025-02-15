import Timestamp from "@/components/timestamp";
import { defaultNews } from "@/constants/images";
import { routes } from "@/routes/routes";
import Image from "next/image";
import Link from "next/link";

const ElectedNewsCard = ({ data }) => {
  return (
    <article className="rounded-lg border border-dotted shadow-lg dark:border-gray-700 dark:shadow-gray-800">
      <Link
        href={routes.root.news.details(data.id)}
        className="flex w-full cursor-pointer gap-2 rounded-lg p-2 shadow-lg"
      >
        <div>
          <Image
            src={defaultNews}
            width={100}
            height={100}
            alt="تصویر خبر"
            className="h-20 w-20 rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-0.5">
          <div className="flex flex-col gap-0.5">
            <span>{data?.title}</span>
            <span className="text-xs text-muted-foreground">
              {data?.description ? `${data.description.substring(0, 32)}` : ""}
              {data?.description && data.description.length > 32 && "..."}
            </span>
          </div>
          <div className="text-xs">
            <Timestamp date={data?.createdAt} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ElectedNewsCard;
