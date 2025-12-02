export default function WhyChooseUsSection() {
  const features = [
    { title: 'RAG powered', highlight: 'Accuracy' },
    { title: 'Curriculum', highlight: 'Trained AI' },
    { highlight: 'Continuous', title: 'Improvement' },
    { highlight: 'Personalized', title: 'AI guidance' },
    { title: 'Instant', highlight: 'feedback', subtitle: ' with report' },
    { highlight: 'Growth', title: 'track' },
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-semibold text-[32px] text-black mb-4">
            Why Should You Choose Us
          </h2>
          <div className="w-[447px] h-[8px] bg-black mx-auto"></div>
        </div>

        <div className="flex gap-16 items-center">
          {/* Left Side - Image Placeholder */}
          <div className="w-[575px] h-[704px] bg-neutral-200 rounded-lg flex-shrink-0">
            {/* This would be replaced with the actual student image from Figma */}
          </div>

          {/* Right Side - Features List */}
          <div className="flex-1 bg-neutral-200 p-12 rounded-lg">
            <ul className="space-y-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-sans text-2xl text-black">
                    <span className="font-light">{feature.title}</span>{' '}
                    <span className="font-bold">{feature.highlight}</span>
                    {feature.subtitle && (
                      <span className="font-light">{feature.subtitle}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

