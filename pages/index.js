import Image from "next/image";

function Home() {
  return (
    <>
      <h1>Nara, eu amo você. Se você me ama, dá uma risadinha</h1>
      <Image src="/foto-nara-lucky.jpeg" width={200} height={320} />
    </>
  );
}

export default Home;
