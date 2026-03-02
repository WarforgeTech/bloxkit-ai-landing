import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, ShieldCheck, Star, Tv, Smartphone } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Jaquic4066",
    role: "Full-Time Game Dev",
    stars: 5,
    quote: "Many years experience later I need a good tutorial for UEFN and google led me here to a familiar face! Many thanks for what you do and the effort you put in, never underestimate the power of sharing your knowledge!",
    image: "/images/testimony-avatar-1.jpg",
    imageHint: "game developer",
  },
  {
    name: "Rhawry",
    role: "Rocket Racing Creator",
    stars: 5,
    quote: "I am currently finishing up my 2nd video game thing ever, thanks to how now you don't have to know a code language to make a video game. They both have been Rocket Racing maps for Fortnite, and I saw you talk for like, a minute and I hit the subscribe button.",
    image: "/images/testimony-avatar-2.jpg",
    imageHint: "racing game creator",
  },
  {
    name: "AlchemyVFX_Catherine",
    role: "First-Time UEFN User",
    stars: 5,
    quote: "This is my first UEFN tutorial and I'm pleased to have found you - I appreciate your instruction and giving context and explanation as to why and what you are doing. All the same, it was fun debugging it and I look forward to learning more from you - thank you!",
    image: "/images/testimony-avatar-3.jpg",
    imageHint: "vfx artist",
  },
  {
    name: "RTheater",
    role: "UEFN Creator",
    stars: 5,
    quote: "Love you man! more more more! Rewatching all your vids again, need help with a lvl up system that increases base stats as lvls are gained. Keep it up! Thank you!",
    image: "/images/testimony-avatar-4.jpg",
    imageHint: "game creator",
  },
  {
    name: "Jordy-377",
    role: "Map Creator",
    stars: 5,
    quote: "Hey! I really love your video tutorials, they are so easy to follow and helpful. I still don't quite understand verse, but have made a map in UEFN. I need help! lol",
    image: "/images/testimony-avatar-5.jpg",
    imageHint: "map creator",
  },
  {
    name: "Artiixtv",
    role: "Step-by-Step Learner",
    stars: 5,
    quote: "You say 'just give it a shot' so i am trying. I am doing one step after one step because this video was more difficult than the others. Thank you for all these videos",
    image: "/images/testimony-avatar-6.jpg",
    imageHint: "learner",
  },
];

const trustBadges = [
  { icon: Award, text: "Certificate of Completion" },
  { icon: ShieldCheck, text: "Full Lifetime Access" },
  { icon: Smartphone, text: "Access on Mobile & TV" },
];

const StarRating = ({ rating, maxStars = 5 }: { rating: number, maxStars?: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-400" />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};


const UEFNLogo = () => (
  <svg className="h-10 w-auto" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M96.0681 32.1311H76.5161L51.0181 96.0691H70.5701L96.0681 32.1311Z" fill="white" />
    <path d="M64 0L0 64V128H128V0H64ZM112 112H16V64L64 16L112 64V112Z" fill="white" />
  </svg>
)

const FortniteLogo = () => (
  <svg className="h-10 w-auto" viewBox="0 0 512 512" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 96v320h448V96H32zm208 32h112v48h-48v32h48v48h-48v48h-64v-32h-32v-32h32v-32h-32v-32h32v-16zm-48-32h64v32h-64V96zm-48 48h32v32h-32v-32zm0 48h32v32h-32v-32zm0 48h32v32h-32v-32zm0 48h32v32h-32v-32z" />
  </svg>
)
const EpicGamesLogo = () => (
  <svg className="h-10 w-auto" viewBox="0 0 512 512" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 32L32 128v256l224 96 224-96V128L256 32zm-64 160h128v32H192v-32zm0 64h128v32H192v-32zm-32-96h32v32h-32v-32zm-32 32h32v32h-32v-32zm32 64h32v32h-32v-32zm-32 32h32v32h-32v-32z" />
  </svg>
)

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-12 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary">
            SMALL COMMUNITY. BUILD. EARN
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Here's what creators are saying after taking this bootcamp.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col overflow-hidden bg-card">
              <CardContent className="flex-1 p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="italic text-foreground/90">"{testimonial.quote}"</blockquote>
              </CardContent>
              <CardFooter className="bg-background/30 p-4">
                <StarRating rating={testimonial.stars} />
              </CardFooter>
            </Card>
          ))}
        </div>



        <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:justify-around">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 text-center">
              <badge.icon className="h-8 w-8 text-accent" />
              <span className="font-semibold text-foreground/80">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}