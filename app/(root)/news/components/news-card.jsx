import Timestamp from "@/components/timestamp";
import { defaultNews, defaultUser } from "@/constants/images";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/routes";
import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ data }) => {
  return (
    <article className="rounded-lg border p-2 shadow-lg dark:border-gray-700 dark:shadow-gray-800">
      <Link
        href={routes.root.news.details(data.id)}
        className="cursor-pointer shadow-lg"
      >
        <Image
          src={defaultNews}
          width={240}
          height={160}
          alt={data?.title}
          className="aspect-video w-full rounded-xl object-cover"
        />

        <div className="mt-2 flex flex-col justify-between py-0.5">
          <div className="flex flex-col gap-0.5">
            <span>{data?.title}</span>
            <span
              className={cn(
                "text-xs text-muted-foreground",
                !data?.description && "invisible",
              )}
            >
              {data?.description
                ? `${data.description.substring(0, 32)}`
                : "توضیحات"}
              {data?.description && data.description.length > 32 && "..."}
            </span>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Image
              src={defaultUser}
              alt=""
              width={100}
              height={100}
              className="h-11 w-11 rounded-full"
            />
            <span className="text-xs text-muted-foreground">{`نوشته شده توسط ${data?.author?.fullName}`}</span>
          </div>

          <div className="mt-4 text-xs">
            <Timestamp date={data?.createdAt} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
