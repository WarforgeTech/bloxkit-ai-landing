import { ShieldCheck, Lock, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8 md:py-12 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          {/* Trust badges */}
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Certificate Included</span>
            </div>
          </div>

          {/* Copyright and links */}
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-sm leading-loose text-muted-foreground">
              © {new Date().getFullYear()} Mark Price. All Rights Reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="mailto:contact@example.com" className="hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}