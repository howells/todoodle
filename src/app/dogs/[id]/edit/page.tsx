"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { DogForm } from "@/components/dogs/dog-form";
import { Header } from "@/components/layout/header";
import { useHydrated } from "@/hooks/use-hydrated";
import type { DogFormData } from "@/lib/schemas";
import { useStore } from "@/lib/store";

export default function EditDogPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const hydrated = useHydrated();
	const dog = useStore((s) => s.dogs.find((d) => d.id === id));
	const updateDog = useStore((s) => s.updateDog);
	const router = useRouter();

	if (!hydrated) {
		return (
			<>
				<Header />
				<div className="max-w-[860px] mx-auto px-6 py-8" />
			</>
		);
	}

	if (!dog) {
		return (
			<>
				<Header />
				<div className="max-w-[860px] mx-auto px-6 py-8">
					<p className="text-muted-foreground">Pup not found.</p>
					<Link
						href="/dogs"
						className="inline-block mt-4 px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors"
					>
						Back to My Pups
					</Link>
				</div>
			</>
		);
	}

	function handleSubmit(data: DogFormData) {
		updateDog(id, data);
		router.push(`/dogs/${id}`);
	}

	return (
		<>
			<Header />
			<div className="max-w-[860px] mx-auto px-6 py-8 md:py-12">
				<h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-[-0.03em] leading-[1.05] mb-8">
					Edit {dog.name}
				</h1>
				<div className="max-w-2xl">
					<DogForm
						initialData={{
							name: dog.name,
							breed: dog.breed,
							weight: dog.weight,
							birthday: dog.birthday,
							avatarEmoji: dog.avatarEmoji,
							allergies: dog.allergies,
							vetName: dog.vetName,
							vetPhone: dog.vetPhone,
							microchipId: dog.microchipId,
							notes: dog.notes,
						}}
						onSubmit={handleSubmit}
						onCancel={() => router.push(`/dogs/${id}`)}
						submitLabel="Save Changes"
					/>
				</div>
			</div>
		</>
	);
}
