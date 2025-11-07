"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Finding account for:", email);
    // Implement account recovery logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative w-full overflow-hidden bg-white">
      <div className="absolute top-[-65px] left-[1236px] w-[501px] h-[234px] bg-white rounded-[250.46px/117.05px] -rotate-45 blur-[234px]" />
      <div className="w-full max-w-2xl p-4 rounded-4xl border  before:pointer-events-none relative">
        <Card className="bg-white rounded-2xl shadow-[-76px_59px_212px_#ff73001a,-305px_235px_250px_#ff730017,-687px_529px_250px_#ff73000d,-1221px_940px_250px_#ff730003,-1908px_1469px_250px_transparent] border-none">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-center gap-1">
                <h1 className=" font-semibold text-[#505050] text-2xl text-center tracking-[0] leading-9">
                  Find Your Account
                </h1>
              </div>

              <div className="flex flex-col items-center justify-center gap-6">
                <p className="w-full max-w-lg  font-normal text-[#505050] text-xl text-center tracking-[0] leading-7">
                  Please enter your email address or mobile number to search for
                  your account.
                </p>

                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex flex-col items-start gap-2 p-0.5 w-full rounded-lg">
                    <Input
                      placeholder="Enter your email or phone number"
                      className="w-full px-3 h-14 rounded-lg border border-solid border-[#E1E1E1]  font-normal text-secondary text-base tracking-[0] leading-5 "
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full px-2 py-3 bg-secondary rounded-lg  font-medium text-secondary text-xl tracking-[0] leading-7 h-auto hover:bg-secondary">
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
