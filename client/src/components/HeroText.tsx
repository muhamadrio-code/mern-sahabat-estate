import { MyLink } from '.'
export const HeroText = () => {

  return (
    <section className="flex flex-col w-full h-96 justify-center items-start max-w-6xl gap-6 p-3 border-b-2">
      <h1 className="text-3xl md:text-6xl font-bold text-slate-700">
        <span>Find your next </span>
        <span className="text-slate-400">perfect</span>
        <br />
        <span >place with ease</span>
      </h1>
      <p className="text-slate-400 text-xs md:text-sm">
        <span>Sahand Estate will help you find your home fast, easy and comfortable.</span>
        <br />
        <span>Our expert support are always available.</span>
      </p>
      <MyLink to='/' size="sm" weight='bold' className='text-blue-900 p-0'>
        Let's Start now...
      </MyLink>
    </section>
  )
}

