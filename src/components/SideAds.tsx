import Image from "next/image";
import sideImage from "@/assets/image/side.jpg";
function SideAds() {
  return (
    <div className=" w-full bg-base-100 shadow-xl object-full  sm:w-96 hidden md:card">
      <div className="card-body p-6">
        <Image
          src={sideImage}
          alt="bg"
          priority
          className="w-full h-full object-cover absolute top-0 left-0 rounded-lg"
        />
      </div>
    </div>
  );
}

export default SideAds;
