export default function DemoSection() {
  return (
    <>
      {/* Demo Video Section */}
      <section id="demo-video" className="py-20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
          <div className="text-center mb-12">
            <h2 className="font-serif font-semibold text-[32px] text-black mb-4">
              Demo Video
            </h2>
            <div className="w-[447px] h-[11px] bg-black mx-auto"></div>
          </div>
          
          {/* Video Placeholder */}
          <div className="bg-neutral-200 rounded-lg h-[454px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-[112px] h-[112px] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <p className="text-gray-600">Demo Video Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Report Section */}
      <section id="demo-report" className="py-20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
          <div className="text-center mb-12">
            <h2 className="font-serif font-semibold text-[32px] text-black mb-4">
              Demo Report
            </h2>
            <div className="w-[447px] h-[16px] bg-black mx-auto"></div>
          </div>
          
          {/* Report Image Placeholder */}
          <div className="bg-neutral-200 rounded-lg h-[498px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-[72px] h-[72px] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
              </div>
              <p className="text-gray-600">Demo Report Placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

