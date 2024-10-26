import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { FadeText } from "@/components/ui/fade-text";
import Ripple from "@/components/ui/ripple";

export default function Landing() {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <Ripple className="overflow-x-auto" mainCircleSize={400} numCircles={4} mainCircleOpacity={0.15} />
      <FadeText
        className="large uppercase"
        direction="down"
        framerProps={{
          show: { transition: { delay: 0.25 } },
        }}
        text="Based in Europe"
      />
      <h1 className="max-w-lg mt-5">
        <AnimatedGradientText>
          <div>
            <span>Turning bold vision into </span>
            <span className={"inline animate-gradient bg-gradient-to-r from-[#40C9FF] via-[#E81CFF] to-[#40C9FF] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"}>
              real impact
            </span>
            <span>.</span>
          </div>
        </AnimatedGradientText> 
      </h1>
      <div className="mt-7 max-w-xs">
        <FadeText
          className="muted text-lg font-medium text-center"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.5 } },
          }}
          text="Cutting-edge web developer enhancing user-centered experiences."
        />
      </div>
    </div>
  );
}