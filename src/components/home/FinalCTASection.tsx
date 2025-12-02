import Button from '@/components/ui/Button';

export default function FinalCTASection() {
  return (
    <section className="bg-neutral-200 py-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px] text-center">
        <h2 className="font-serif font-semibold text-[32px] text-black mb-8">
          Everything you need in one place
        </h2>
        <Button variant="accent" href="/signup">
          Try It Free
        </Button>
      </div>
    </section>
  );
}

