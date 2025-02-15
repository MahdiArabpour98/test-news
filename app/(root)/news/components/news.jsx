import Timestamp from "@/components/timestamp";
import { Separator } from "@/components/ui/separator";
import { defaultNews, defaultUser } from "@/constants/images";
import Image from "next/image";

const NewsDetails = ({ data }) => {
  return (
    <article>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="col-span-2 mt-2 flex flex-col py-0.5">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-semibold text-primary">
              {data?.title}
            </h1>
            <p className="mt-4 text-justify text-base leading-8 text-muted-foreground">
              {data?.description}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Image
              src={defaultUser}
              alt=""
              width={100}
              height={100}
              className="h-11 w-11 rounded-full"
            />
            <span className="text-base text-muted-foreground">{`نوشته شده توسط ${data?.author?.fullName}`}</span>
          </div>
          <div className="mt-4 text-base">
            <Timestamp date={data?.createdAt} />
          </div>
        </div>
        <div className="col-span-2">
          <Image
            src={defaultNews}
            width={240}
            height={160}
            alt="تصویر خبر"
            className="aspect-video w-full rounded-xl object-cover"
          />
        </div>
      </div>
      <Separator className="my-4 h-[1px] bg-primary" />
      {data?.content && (
        <div
          className="editorImage mt-4 w-full"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    </article>
  );
};

export default NewsDetails;
