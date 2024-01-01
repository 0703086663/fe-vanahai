import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Header hasBackground />
      <section className="relative">
        <Image
          src="/banner.jpg"
          height={1584}
          width={700}
          alt=""
          className="w-full h-[700px] object-cover brightness-50 animate-image"
        />
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
          <div className="animate fadeIn-1">
            <h1 className="text-white text-center text-4xl italic select-none">
              “As long as there was coffee in the world,
            </h1>
            <h1 className="text-white text-center text-4xl select-none">
              how bad could things be?”
            </h1>
          </div>
          <div className="flex justify-center pt-5 animate fadeIn-2">
            <Link href="/menu" draggable={false}>
              <button
                className="py-3 px-5 bg-[#2596BE] hover:brightness-90 active:scale-[98%] text-white rounded-md select-none"
                draggable={false}
              >
                Browse our drinks
              </button>
            </Link>
          </div>
          I
        </div>
      </section>
      <section className="relative py-10">
        <div className="flex justify-center flex-wrap">
          <div className="px-10">
            <Image
              src="/location/shop1.jpg"
              height={693}
              width={504}
              alt=""
              className="h-[550px] w-[504px] object-cover shadow-2xl rounded-md animate fadeIn-1"
            />
          </div>
          <div className="mt-16">
            <Image
              src="/location/shop.jpg"
              height={480}
              width={780}
              alt=""
              className="w-[780px] h-[400px] object-cover shadow-xl rounded-md animate fadeIn-1"
            />
            <p className="w-[780px] text-sm tracking-wider mt-4 animate fadeIn-2">
              VanaHai Bubble Tea - Welcome to VanaHai, where we transport you to
              the vibrant streets of Taiwan with every sip.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto pb-10 pt-4 px-[100px]">
        <div className="tracking-wide leading-10">
          <h3 className="text-3xl text-[#2596BE] animate fadeIn-1 py-4">
            WHAT WE BELIEVE
          </h3>
          <p className="py-4 animate fadeIn-2">
            We believe in produce. Tasty produce. Produce like:
          </p>

          <p className="py-4 animate fadeIn-3">
            Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas.
            Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants.
          </p>
          <p className="py-4 animate fadeIn-4">
            Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli.
            Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries.
            Raspberries. Cilantro. Parsley. Dill.
          </p>
          <p className="py-4 animate fadeIn-5">What are we forgetting?</p>
          <p className="py-4 animate fadeIn-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae aut
            asperiores quibusdam, nam sunt ipsa distinctio necessitatibus quis
            at, doloremque facere quod. Repudiandae quos magni voluptates
            officiis temporibus blanditiis adipisci.
          </p>
          <p className="py-4 animate fadeIn-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            nisi, maxime corrupti aut natus ipsam vitae corporis! Dicta, at
            fugit magni voluptatem odio iure, rem aliquid voluptatibus quas
            ullam laudantium!
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}
