import Image from "next/image";

export default function Testimonial() {
    return (
        <>
            {/* Testimonials Section: Simple */}
            <div className="bg-white dark:bg-gray-900 dark:text-gray-100">
                <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
                    <div className="relative">
                        <div className="absolute right-0 top-0 -mt-5 font-serif text-9xl text-gray-200 opacity-75 dark:text-gray-700/75">
                            “
                        </div>
                        <div className="relative text-center">
                            <div className="mb-3">
                                <div className="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-amber-500 dark:border-amber-900/50 dark:bg-amber-900/25">
                                    <svg
                                        className="hi-mini hi-star inline-block size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        className="hi-mini hi-star inline-block size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        className="hi-mini hi-star inline-block size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        className="hi-mini hi-star inline-block size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        className="hi-mini hi-star inline-block size-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="mx-auto lg:w-2/3 xl:w-1/2">
                                <p className="mb-5 text-xl font-semibold leading-8">
                                    I’ve started using Event Fusion this
                                    september, the result is amazing. The
                                    Control Panel streamlines everything and is
                                    easy to use. First Class automation for
                                    event organizers.
                                </p>
                                <footer className="space-y-4">
                                    <a
                                        href="#"
                                        className="mx-auto block size-20 overflow-hidden rounded-full border-2 border-gray-50 transition duration-150 ease-out hover:scale-125 hover:border-white hover:shadow-md active:scale-110 active:border-gray-50 active:shadow-sm dark:border-gray-900 dark:shadow-gray-950"
                                    >
                                        <Image
                                            src="https://cdn.tailkit.com/media/placeholders/avatar-iFgRcqHznqg-160x160.jpg"
                                            alt="Avatar Photo"
                                            width={160}
                                            height={160}
                                        />
                                    </a>
                                    <div>
                                        <a
                                            href="#"
                                            className="text-lg font-semibold text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            John Smith
                                        </a>
                                        <div className="mx-auto my-1 h-1 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/25" />
                                        <p className="font-medium text-gray-500 dark:text-gray-400">
                                            Event Hosting and Management expert
                                        </p>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
            {/* END Testimonials Section: Simple */}
        </>
    );
}
