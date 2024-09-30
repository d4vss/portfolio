import GitHubData from "@/components/github-data";
import AnimatedPreloaderAbout from "@/components/preloader-about";

export default function About() {
  return (
    <>
      <h2>About me</h2>
      <p className="mb-5">
        Hello! I&apos;m Davs, a passionate web developer and technology enthusiast. With a strong background in JavaScript, TypeScript, and various modern frameworks, 
        I thrive on creating intuitive and engaging user experiences. I&apos;ve had the privilege of working on a diverse range of projects, from dynamic web applications to responsive design solutions. 
        My love for coding extends beyond the screen; I enjoy tackling complex problems and finding innovative ways to bring ideas to life.
      </p>
      <p className="mb-5">
        In addition to my technical skills, I have a keen interest in design and user experience, which I believe are just as important as functionality. 
        I&apos;m always exploring new tools and technologies to enhance my skill set and stay current in this ever-evolving field. When I&apos;m not coding, you can find me reading or contributing to open-source projects. 
        I believe in continuous learning and am always eager to connect with like-minded individuals.
      </p>

      <AnimatedPreloaderAbout />
      <GitHubData />
    </>
  );
}