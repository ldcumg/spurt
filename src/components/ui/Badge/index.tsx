export type BadgeType = "todo" | "done" | "goal"| "category";

const BADGE_CONFIG: Record<BadgeType,{label:string; style: string}>={
    todo:{
        label:"TO DO",
        style:"bg-coral-500 text-coral-500"
    },
    done:{
        label:"DONE",
        style:"bg-primary-100 text-primary-600"
    },
    goal:{
        label:"GOAL",
        style:"bg-blue-100 text-blue-500"
    },
    category:{
        label: "CATEGORY",
        style: "bg-yellow-500 text-yellow-100"
    }
}

interface BadgeProps{
    type: BadgeType;
    className?: string;
}

export default function Badge({type, className=""}: BadgeProps){
    const currentBadge = BADGE_CONFIG[type];

    return(
    <div className={`px-10 py-5 rounded-6 ${currentBadge.style} ${className}`}>
        {currentBadge.label}
    </div>
    );
}