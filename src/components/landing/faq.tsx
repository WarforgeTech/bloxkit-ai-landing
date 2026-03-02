import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need coding experience?",
    answer: "No, everything is taught from scratch – no prior coding or game-dev needed."
  },
  {
    question: "What if I'm a total beginner?",
    answer: "Perfect! The bootcamp starts with basics like account setup and your first game build."
  },
  {
    question: "How long does it take to complete?",
    answer: "About 8.5 hours of video, self-paced – finish in a weekend or spread out."
  },
  {
    question: "Can I really make money?",
    answer: "Yes, learn to publish islands and set up Epic payouts; creators have earned from $700M+ pool via engagement and revenue shares."
  },
  {
    question: "What about course updates?",
    answer: "Lifetime access includes all future updates and new content."
  },
  {
    question: "Is this for Mac users?",
    answer: "Requirements specify Windows PC for UEFN, but check Epic's latest compatibility."
  },
  {
    question: "How do I get support?",
    answer: "Join the community for resources, help, and direct Q&A."
  }
];

export default function Faq() {
  return (
    <section id="faq" className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary">
            Got Questions? We've Got Answers
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={faq.question}>
              <AccordionTrigger className="text-xl font-bold text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-lg text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}