export default function HowItWorksSection() {
  const steps = [
    'Select a subject and exam board',
    'Choose a past paper or practice questions',
    'Answer questions and get instant AI feedback',
    'Review detailed reports and track your progress',
  ];

  return (
    <section id="how-it-works" className="bg-neutral-200 py-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-semibold text-[32px] text-black mb-4">
            How It Works
          </h2>
          <div className="w-[447px] h-[9px] bg-black mx-auto"></div>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <span className="font-sans text-2xl text-black font-semibold">
                {index + 1}.
              </span>
              <p className="font-sans text-2xl text-black flex-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

