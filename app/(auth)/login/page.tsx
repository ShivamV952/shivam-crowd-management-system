import Image from "next/image";
import LoginModal from "@/components/auth/LoginModal";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full">
      
      {/* Background Image */}
      <Image
        src="/bg-office.png"
        alt="Office Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-between px-60">
        
        {/* Left Text Section */}
        <div className="max-w-md text-white">
          <p className="text-4xl font-semibold">
            Welcome to the <br />
            <span className="font-bold whitespace-nowrap pt-3">Crowd Management System</span>
          </p>
        </div>

        {/* Right Login Card */}
        <div className="">
          <LoginModal />
        </div>
      </div>
    </div>
  );
}

