import { RoughNotation } from "react-rough-notation";
import { useDetectVisibleAssets } from "@/src/hooks/useDetectVisibleAssets";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/src/components/ui/origin/timeline";

export default function PageHomeTimeLineContent() {
  const { ref, isVisible } = useDetectVisibleAssets<HTMLDivElement>({
    delayPlus: -500,
    inViewOptions: { once: true, margin: "0px 0px -100px 0px" },
  });

  return (
    <div ref={ref} className="flex flex-col bg-background px-5 py-10">
      <div className="w-full max-w-5xl mx-auto mb-10 px-5">
        <div className="w-fit mx-auto">
          <RoughNotation
            type="underline"
            show={isVisible}
            animationDuration={1500}
            color="color-mix(in oklab, var(--accent) 80%, transparent)"
            strokeWidth={5}
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-shadow-md/10 text-center uppercase">
              TimeLine
            </h1>
          </RoughNotation>
        </div>
      </div>
      <TimeLineContent />
    </div>
  );
}

const items = [
  {
    id: 1,
    date: "2009年8月",
    title: "誕生",
    description: "この世に生を受ける。",
  },
  {
    id: 2,
    date: "2022年3月",
    title: "小学生卒業",
    description:
      "プログラミングに初めて触れる。学校の授業で簡単なビジュアルプログラミングを学び、興味を持ち始める。",
  },
  {
    id: 3,
    date: "2022年4月",
    title: "中学校に入学",
    description:
      "人生で初めて PC を購入し、プログラミングを本格的に学び始める。初めての言語は HTML で、ウェブサイトの作成に挑戦。",
  },
  {
    id: 4,
    date: "2025年3月",
    title: "中学生卒業",
    description:
      "中学三年間での学びを終え、次のステップへ進む準備を整える。友人との思い出が詰まった卒業式を迎える。",
  },
  {
    id: 5,
    date: "2025年4月",
    title: "高等学校に入学",
    description:
      "義務教育を終え、希望する高校へ進学。新しい環境での学びと友人との出会いが始まる。",
  },
  {
    id: 6,
    date: "xxxx年xx月",
    title: "COMING SOON",
    description:
      "新たな物語",
  },
];

function TimeLineContent() {
  return (
    <div className="mt-5">
      <Timeline defaultValue={items.length - 1}>
        {items.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="group-data-[orientation=vertical]/timeline:sm:ms-32"
          >
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right">
                {item.date}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5">{item.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>{item.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
