import { MainLayout } from "../components/layouts/MainLayout";

export default function HomePage() {
	return (
		<MainLayout>
			<div className="">
				{/* <header className="h-24 border-b border-b-[#174467] w-full z-20" /> */}
				<header className="flex flex-row px-6 py-3 gap-8">
					<button type="button" className="text-green-6 text-3xl">
						Moviestation
					</button>
					<ul className="ml-auto flex flex-row gap-6 items-center">
						<li>
							<button type="button" className="text-lg text-green-3">
								Favorites
							</button>
						</li>
						<li>
							<button type="button" className="text-lg text-green-3">
								My movies
							</button>
						</li>
						<li>
							<button type="button" className="text-lg text-green-3">
								My series
							</button>
						</li>
					</ul>
					<input
						type="text"
						className="rounded-lg border-2 border-green-12 bg-transparent px-3 py-2 text-green-2"
						placeholder="Search"
					/>
				</header>
				{/* <div className="grid grid-cols-[3fr_1fr] gap-8 max-w-screen-lg mx-auto">
					<div className="flex flex-col gap-4">
						<h1 className="text-4xl text-green-5">The Shawshank Redemption</h1>
						<p className="text-green-3">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
							consequuntur itaque exercitationem rerum, iste pariatur
							repudiandae quod iusto quos placeat debitis ipsum dicta corrupti?
							Sed ad esse hic consequatur voluptatum.
						</p>
					</div>
					<div className="aspect-square h-64">
						<img
							src="https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg"
							alt=""
						/>
					</div>
				</div> */}
				<div className="h-96 overflow-hidden relative w-full">
					<img
						src="https://m.media-amazon.com/images/M/MV5BMmJlMDI5ODEtZTU1Ny00MTNkLWIxODMtMGYwY2YyNDdjNWVmXkEyXkFqcGc@._V1_FMjpg_UX2160_.jpg"
						alt=""
					/>
					<div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent via-[#001220]/30 to-[#001220] z-10 flex flex-col justify-end">
						<div className="max-w-xl flex flex-col gap-6 p-8">
							<h2 className="text-6xl text-white font-semibold">INSIDE OUT</h2>
							<p className="text-slate-4">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem,
								nam dolores tenetur fuga voluptatum, doloremque nemo vel tempore
								iure accusantium autem itaque, sunt aperiam? Veritatis
								laudantium nam sit pariatur neque.
							</p>
              <button type="button" className="rounded-xl bg-slatedark-5 text-green-4 font-medium w-fit px-6 py-3">
                Go to movie
              </button>
						</div>
					</div>
				</div>
				<div className="h-80 overflow-hidden mt-6">
					<div className="bg-[url('/src/assets/waves2.svg')] aspect-video bg-norepeat bg-cover bg-center -translate-y-[32rem]" />
				</div>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
				<p>T</p>
			</div>
		</MainLayout>
	);
}
