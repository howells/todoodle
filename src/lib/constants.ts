import {
	Footprints,
	GraduationCap,
	Heart,
	Pill,
	Scissors,
	ShoppingBag,
	UtensilsCrossed,
} from "lucide-react";
import type { TaskCategory, TaskPriority } from "@/types";

// === Task Categories ===

export const TASK_CATEGORIES: {
	value: TaskCategory;
	label: string;
	color: string;
	bgColor: string;
	icon: typeof Heart;
}[] = [
	{
		value: "health",
		label: "Health & Vet",
		color: "text-blue-700",
		bgColor: "bg-blue-50",
		icon: Heart,
	},
	{
		value: "medications",
		label: "Medications",
		color: "text-purple-700",
		bgColor: "bg-purple-50",
		icon: Pill,
	},
	{
		value: "grooming",
		label: "Grooming",
		color: "text-pink-700",
		bgColor: "bg-pink-50",
		icon: Scissors,
	},
	{
		value: "walks",
		label: "Walks & Exercise",
		color: "text-emerald-700",
		bgColor: "bg-emerald-50",
		icon: Footprints,
	},
	{
		value: "feeding",
		label: "Feeding",
		color: "text-amber-700",
		bgColor: "bg-amber-50",
		icon: UtensilsCrossed,
	},
	{
		value: "training",
		label: "Training",
		color: "text-teal-700",
		bgColor: "bg-teal-50",
		icon: GraduationCap,
	},
	{
		value: "supplies",
		label: "Supplies & Errands",
		color: "text-orange-700",
		bgColor: "bg-orange-50",
		icon: ShoppingBag,
	},
];

export function getCategoryConfig(category: TaskCategory) {
	const config = TASK_CATEGORIES.find((c) => c.value === category);
	if (!config) throw new Error(`Unknown category: ${category}`);
	return config;
}

// === Priority border colors (D1 editorial style) ===

export function getPriorityBorderColor(priority: TaskPriority): string {
	switch (priority) {
		case "high":
			return "oklch(0.52 0.18 28)";
		case "medium":
			return "oklch(0.58 0.14 75)";
		case "low":
			return "oklch(0.55 0.10 150)";
	}
}

// === Priorities ===

export const PRIORITIES: { value: TaskPriority; label: string }[] = [
	{ value: "high", label: "High" },
	{ value: "medium", label: "Medium" },
	{ value: "low", label: "Low" },
];

// === Dog Emoji Options ===

export const DOG_EMOJI_OPTIONS = [
	"🐶",
	"🐕",
	"🦮",
	"🐕‍🦺",
	"🐩",
	"🐾",
	"🐺",
	"🦊",
	"🐻",
	"🐰",
	"🐱",
	"🦁",
];

// === Celebration Messages ===

export const COMPLETION_MESSAGES = [
	"Good human! 🐾",
	"Paws up! Task done!",
	"Tail wags all around! 🎉",
	"Treat yourself — you earned it!",
	"Woof! Another one done!",
	"Best dog parent ever! 🏆",
	"High paw! ✋🐾",
	"That deserves a belly rub!",
];

export function getRandomCompletionMessage() {
	return COMPLETION_MESSAGES[
		Math.floor(Math.random() * COMPLETION_MESSAGES.length)
	];
}
