import Image from "@/components/custom/image";

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <Image
        alt="I'm a programmer"
        src="/wp-content/uploads/kawaii-logos/im-a-programmer.png"
        className="animate-pulse"
      />
    </div>
  );
}

export default Loading;
