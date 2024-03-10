export { metadata } from "@/app/layout";

export default function Home() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Hey,</h1>
        <h2>It&apos;s my space on the internet</h2>
      </div>

      <p className="text-sm">
        Welcome to my space on the internet, I’m Zeyad software engineer from
        🇪🇬, I created this site to be a digital place to me, you will also find
        some general thoughts (not-tech).
        <br />
        <br />I have more than 6 years experience working as frontend engineer/
        fullstack engineer, So if you’re a student or fresh graduate and need an
        advice, don’t hesitate to book{" "}
        <a href="https://adplist.org/mentors/zeyad-etman" className="link">
          a 30mins with me
        </a>
        . If you want to work with me, let’s contact via{" "}
        <a className="link" href="mailto:zeyadetman.com">
          email.
        </a>
        <br />
        <br />I write tech notes/bookmarks that may be helpful on{" "}
        <a className="link" href="https://notes.zeyadetman.com">
          my digital garden 🪴
        </a>
        . I share on it at short intervals, also I review the written notes from
        time to time to update them either adding more details or updating them.
        <br />
        <br />
        <i>النسخة العربية ستأتى قريبًا.</i>
      </p>
    </div>
  );
}
