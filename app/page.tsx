
import Landing from "@/components/landing";
import Technologies from "@/components/technologies";
import { FadeText } from "@/components/ui/fade-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import TextRevealByWord from "@/components/ui/text-reveal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="min-h-screen flex justify-center flex-col">
        <Landing />
      </section>
      
      <section className="width-regulator mt-4">
        <div>
          <h2>
            <FadeText text="Hey, I&apos;m Davs." />
          </h2>

          <div className="text-lg muted">
            <FadeText text="I&apos;m a 17-year-old full-stack web developer focused on turning ideas into creative solutions. 
              I specialize in building seamless, intuitive user experiences that prioritize clarity and usability.
              Involved in every stage of development - from discovery and design to testing and deployment - I aim to 
              deliver high-quality, scalable results that enhance the user experience and add lasting value." />
          </div>
        </div>
        <Technologies />
      </section>
      
      <section>
        <TextRevealByWord text="I believe in a design philosophy that centers around the user, customizing each project to fit their needs." />
      </section>
      
      <section className="mb-20 text-center flex gap-10 items-center justify-center max-md:flex-col">
        <p className="large">Want to see some of my projects?</p>
        <Link href="https://github.com/d4vss" target="_blank">
          <RainbowButton>Visit my GitHub</RainbowButton>
        </Link>
      </section>
    </>
  );
}
