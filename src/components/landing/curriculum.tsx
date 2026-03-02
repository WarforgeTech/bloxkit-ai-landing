'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PlayCircle, Clock, ListVideo, Award } from "lucide-react";
import { redirectToStripeCheckout } from "@/lib/stripe-checkout";
import { getPriceId } from "@/lib/product-catalog";
import { getStripeConfig } from "@/lib/stripe-config";
import { useUpsell } from "@/hooks/use-upsell";

const curriculumModules = [
  {
    title: "Introduction",
    details: "6 Lectures • ~23m",
    content: [
      { lecture: "Intro to Course", time: "02:47" },
      { lecture: "Join the Community, Find Resources, Get Help", time: "00:57" },
      { lecture: "Creating a Fortnite Creator Account", time: "03:54" },
      { lecture: "Building Your Very First Game", time: "07:56" },
      { lecture: "Understanding the Fortnite Ecosystem", time: "03:09" },
      { lecture: "Official UEFN Tutorials & Documentation", time: "04:13" },
    ],
  },
  {
    title: "How to Build WITHOUT Code",
    details: "11 Lectures • ~1h 15m",
    content: [
      { lecture: "Get Started Easy With UEFN Game Templates", time: "04:40" },
      { lecture: "The Basics of UEFN - Move, Scale, Rotate", time: "07:42" },
      { lecture: "Understanding the Fortnite Grid System", time: "08:28" },
      { lecture: "Island Settings & Changing Time of Day", time: "04:47" },
      { lecture: "Intro to Landscaping", time: "09:39" },
      { lecture: "Painting Landscape", time: "05:35" },
      { lecture: "How to Use Fab and Make a Desert With Foliage", time: "10:55" },
      { lecture: "Working With Water in UEFN", time: "05:27" },
      { lecture: "Free Fortnite Props and Galleries", time: "09:28" },
      { lecture: "Fortnite Creative Devices", time: "10:32" },
      { lecture: "How to Make Walking Dead and LEGO Games", time: "09:34" },
    ],
  },
  {
    title: "Oddly Obby: Building a Full Fortnite Creative Game",
    details: "17 Lectures • ~2h 30m",
    content: [
      { lecture: "Game Design and Planning", time: "05:01" },
      { lecture: "Creating the Tasklist With AI", time: "01:41" },
      { lecture: "Creating Colors & Materials", time: "11:50" },
      { lecture: "Creating Custom 3D Assets With AI Tools", time: "08:03" },
      { lecture: "Creating the Landscape", time: "07:52" },
      { lecture: "Foliage Part 1", time: "09:32" },
      { lecture: "Foliage Part 2", time: "07:34" },
      { lecture: "Volume Teleport Device", time: "05:55" },
      { lecture: "Building the Obby", time: "10:43" },
      { lecture: "Obby Island Settings", time: "05:15" },
      { lecture: "XP Coins & Accolades", time: "11:19" },
      { lecture: "Creating the Winners Area", time: "19:02" },
      { lecture: "Creating a Cutscene Cinematic", time: "10:10" },
      { lecture: "Creating Game Music", time: "09:44" },
      { lecture: "Writing Your First Code with Verse", time: "08:07" },
      { lecture: "Creating a Jump Tracker With Verse", time: "15:59" },
      { lecture: "Creating a Time Tracker with Verse", time: "05:19" },
    ],
  },
  {
    title: "How to Publish and Earn",
    details: "6 Lectures • ~37m",
    content: [
      { lecture: "Researching Competitors & Seeing Creator Revenue", time: "06:04" },
      { lecture: "Creating a Fortnite Island Thumbnail", time: "08:07" },
      { lecture: "Creating a Fortnite Island Lobby Background", time: "04:09" },
      { lecture: "Setting the Ratings for Your Island", time: "07:22" },
      { lecture: "Island Meta Data and Publishing", time: "06:26" },
      { lecture: "How to Market Your Fortnite Island", time: "04:49" },
    ],
  },
  {
    title: "Skill Upgrade: Learn to Code With Verse",
    details: "7 Lectures • ~3h 45m",
    content: [
      { lecture: "Intro to Verse & Variables", time: "25:38" },
      { lecture: "Working with Verse Operators", time: "24:53" },
      { lecture: "Control Flow in Verse", time: "22:04" },
      { lecture: "Simple Verse Loops", time: "24:51" },
      { lecture: "Working with Functions in Verse", time: "27:58" },
      { lecture: "Understanding Classes & Object Oriented Programming", time: "32:37" },
      { lecture: "Using Arrays in Verse", time: "46:03" },
    ],
  },
];

const courseTotals = [
  { icon: ListVideo, text: "5 Sections" },
  { icon: Award, text: "48 Lectures" },
  { icon: Clock, text: "8h 23m Total Length" },
];

export default function Curriculum() {
  const { openUpsell } = useUpsell();

  const handleEnroll = () => {
    openUpsell();
  };

  return (
    <section id="curriculum" className="py-12 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary">
            What's Inside: Step-by-Step Modules to Build Your First Pro Island
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
            A complete roadmap from blank canvas to published, monetized game. Here's everything you get.
          </p>
        </div>

        <div className="my-12 grid grid-cols-3 gap-4 text-center">
          {courseTotals.map((total) => (
            <div key={total.text} className="flex flex-col items-center gap-2 rounded-lg bg-background/50 p-4">
              <total.icon className="h-8 w-8 text-primary" />
              <span className="font-semibold text-foreground">{total.text}</span>
            </div>
          ))}
        </div>

        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {curriculumModules.map((module, index) => (
            <AccordionItem value={`item-${index}`} key={module.title} className="border rounded-md mb-4">
              <AccordionTrigger className="text-xl font-bold hover:no-underline text-left bg-accent/10 rounded-t-md p-4">
                <div className="flex flex-col items-start">
                  <span>{module.title}</span>
                  <span className="text-sm font-normal text-muted-foreground">{module.details}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-4">
                <ul className="space-y-3">
                  {module.content.map((item) => (
                    <li key={item.lecture} className="flex items-center justify-between">
                      <div className="flex items-start">
                        <PlayCircle className="h-6 w-6 mr-3 mt-1 text-accent flex-shrink-0" />
                        <span className="text-base text-foreground/80">{item.lecture}</span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono bg-background/50 px-2 py-1 rounded-md">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Verse Programming Examples Images */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">Learn Code &amp; Drag and Drop</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/uefn-screenshot-1.png"
                alt="UEFN Screenshot 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/uefn-screenshot-2.png"
                alt="UEFN Screenshot 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/uefn-screenshot-3.png"
                alt="UEFN Screenshot 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={handleEnroll}
            size="lg"
            className="font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD447]/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
          >
            Start Building Your Island
          </Button>
        </div>
      </div>
    </section>
  );
}