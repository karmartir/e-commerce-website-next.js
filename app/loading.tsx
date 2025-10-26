import Image from "next/image";
import loader from "@/assets/loader.gif";
const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen width-full">
      <Image className="w-30" src={loader} alt="Loading..." />
    </div>
  );
};

export default LoadingPage;
