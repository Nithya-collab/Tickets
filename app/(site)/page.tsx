import Cta from "@/components/blocks/Cta";
import Partners from "@/components/blocks/Partners";
import Testimonial from "@/components/blocks/Testimonial";

export default function Home() {
    return (
        <>
            <picture>
                <source
                    media="(max-width: 640px)"
                    srcSet="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=640&h=234&fit=crop&crop=bottom"
                    width="640"
                    height="234"
                />
                <source
                    media="(max-width: 1024px)"
                    srcSet="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1024&h=384&fit=crop&crop=bottom"
                    width="1024"
                    height="384"
                />
                <img
                    className="max-w-100"
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=720&fit=crop&crop=bottom"
                    alt="Discover your engagement at Event Fusion"
                />
            </picture>
            <div className="w-100 text-slate-200 bg-black/5 inset-0 absolute top-11">
                <div className="flex flex-col items-center justify-center sm:text-center lg:items-start lg:py-12 lg:text-left px-[10%] xl:pr-0 xl:w-5/12 xl:py-24">
                    <h1 className="my-8 text-4xl md:text-5xl font-mono font-bold md:mb-4">
                        Find your next event
                    </h1>

                    <p className="mb-8 leading-relaxed md:mb-12 lg:w-4/5 xl:text-lg">
                        Find events that are right for you by filtering through location,
                        category, artist, and more based on your interests.
                    </p>

                    <form className="sm:flex w-full gap-2 md:max-w-md">
                        <input
                            placeholder="Events that interests you"
                            className="w-full flex-1 rounded border bg-gray-50 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />

                        <button className="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base mt-4">
                            Search
                        </button>
                    </form>
                </div>
            </div>
            <main className="flex flex-col items-center justify-between p-4 lg:px-24">
                <Cta></Cta>
                <Partners></Partners>
                <Testimonial></Testimonial>
            </main>
        </>
    );
}
