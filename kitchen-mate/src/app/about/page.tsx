"use client";
import { motion } from "framer-motion";
export default function AboutPage() {
  return (
    <motion.div className="h-full">
      <div>
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-32 zl:gap-64">
          <div className="flex flex-col gap-12 justify-center">
            <h1 className="font-bold text-2xl">Biography</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
              inventore rerum sint? Recusandae ex, sequi sed quisquam incidunt,
              ab dicta possimus, reprehenderit rerum itaque eius dolores nostrum
              vel delectus deserunt?
            </p>
            <span className="italic">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudan
            </span>
          </div>
          <div className="flex flex-col gap-12 justify-center">
            <h1 className="font-bold text-2xl">Skill</h1>
            <div className="flex gap-4 flex-wrap">
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                JavaSript
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                HTTP
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                CSS
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                React
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                NEXT.js
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                Expo
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                MongoDB
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                Node.JS
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                Tailwind CSS
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                GraphQl
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                TypeScript
              </div>
              <div className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-slate-400 hover:text-blue-400">
                PostgresSQL
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-12 justify-center pb-48">
            <h1 className="font-bold text-2xl">Experient</h1>
            <div className="">
              {/*experient list item*/}
              <div className="flex justify-between h-48">
                {/*Left*/}
                <div className="w-1/3">
                  <div className="">Title</div>
                  <div className="">description</div>
                  <div className="">Date</div>
                </div>
                {/*Center*/}
                <div className="w-1/6">
                  {/*Line*/}
                  <div className="">
                    {/*Circle*/}
                    <div className=""></div>
                  </div>
                </div>
                {/*Right*/}
                <div>
                  <div className="w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
