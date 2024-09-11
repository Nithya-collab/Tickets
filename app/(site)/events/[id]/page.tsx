import { fetchEventById } from "@/db/queries/events";
import dayjs from "dayjs";

function locaTimeZone() {
	return Intl.DateTimeFormat(navigator.language, {timeZoneName: "short"}).format().slice(10)
}

// export default async function Home({ params: { id }}: {id: number} ) {
export default async function Home({ params: { id }}: { params: {id: number}}) {
	const event = await fetchEventById(Number(id));
	return (
		<main className="p-2 min-h-screen mx-auto max-w-7xl grid grid-cols-2">
			<div className="col-span-1">
				<h1 className="my-4 text-2xl">{event.name} </h1>
				<p className="max-w-xl">{event.description}</p>
			</div>
			<div className="col-span-1">
				<time className="text-5xl">{dayjs(event.start_time).format("DD")}</time> <br />
				<time className="text-2xl">{dayjs(event.start_time).format("MMMM")}</time> <br />
				<time>{dayjs(event.start_time).format("HH:mm A").concat(" - ")}</time>
				<time>{dayjs(event.end_time).format("HH:mm A ")}</time>
				<span>{locaTimeZone()}</span>
			</div>
		</main>

	);
}