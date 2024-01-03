import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Page = () => {
  return (
    <>
      <Header hasBackground={false} />
      <section className="container mx-auto px-10 pt-[140px] flex flex-col items-center">
        <div className="relative flex justify-center">
          <h1 className="text-3xl pb-[40px] animate fadeIn-1">ABOUT US</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 top-1/2 animate fadeIn-2"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="italic pl-4 animate fadeIn-3 text-center border-[2.5px] border-y-0 border-r-0 border-solid border-[#2596BE]">
            We believe our real purpose in life can be found in serving others.
            We found ours in serving you through coffee.
          </span>
        </div>
        <div className="max-w-[740px] py-[40px] tracking-wide">
          <div className="animate fadeIn-4">
            <p>
              At Vanahai, each day starts with a great cup of coffee with
              family, friends, co-workers ... As great coffee should be
              experienced - not rushed!
            </p>
            <br />
            <p>
              Our company was founded based on a passion to deliver you fresh
              roasted premium coffees that taste the way coffee was meant to
              taste, and we think a great cup of coffee inspires great
              conversation. In some small way, we hope to impact this world
              through great tasting coffee shared in community with others.
            </p>
          </div>
          <br />
          <div className="animate fadeIn-5">
            <h3 className="font-semibold text-xl ">
              OUR COMMITMENT TO BUILDING COMMUNITY
            </h3>
            <br />
            <p>
              At Vanahai Coffee, community includes all of us ... wherever we
              live, work, rest, and play. Our similarities outweigh our
              differences and our belief is that we can build community one cup
              at a time, whether here in the Southwest, with you our customers,
              and across the globe in the farm communities that produce our
              delicious coffee beans.
            </p>
            <br />
            <p>
              But we are more than just a coffee fix, we have a vision to serve
              and educate through scholarships and training programs in both
              barista training and roasting; giving the opportunity to elevate
              youth and the underprivileged with life changing skills and
              opportunities.
            </p>
            <br />
            <p>
              Connect with us in person at one of our local Coffee Tasting
              Events in the Estonia area. Follow us on Facebook or Instagram for
              the next tasting event.
            </p>
          </div>
          <br />
          <div className="animate fadeIn-6">
            <h3 className="font-semibold text-xl ">
              OUR COMMITMENT TO GREAT COFFEE
            </h3>
            <br />
            <p>
              <b className="font-semibold">Taste</b>: We are committed to
              crafting you excellent roasted whole bean coffee delivered fresh.
              We roast our coffees in a fluid bed roaster in small batches using
              traditional sight, smell, sound, & a bit of technology to craft
              flavor.
            </p>
            <br />
            <p>
              <b className="font-semibold">Health & Environment</b>: Our Coffee
              is roasted in an environmentally friendly manner while burning no
              fossil fuels. We use only clean, hydroelectricity generated here
              in the Southwest leaving a minimal carbon footprint.
            </p>
            <br />
            <p>
              <b className="font-semibold">Sourcing our Beans</b>: We are
              committed to bringing you responsibly sourced, high quality
              arabica beans. This is based on a commitment to our growers &
              their communities
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Page
