export type BadgeType = "todo" | "done" | "goal"| "category";

const BADGE_CONFIG: Record<BadgeType,{label:string; style: string}>={
    todo:{
        label:"TO DO",
        style:"bg-coral-light text-coral"
    },
    done:{
        label:"DONE",
        style:"bg-primary-100 text-primary-600"
    },
    goal:{
        label:"GOAL",
        style:"bg-blue-light text-blue"
    },
    category:{
        label: "CATEGORY",
        style: "bg-yellow-light text-yellow"
    }
}

interface BadgeProps{
    type: BadgeType;
    className?: string;
}

export default function Badge({type, className=""}: BadgeProps){
    const currentBadge = BADGE_CONFIG[type];

    return(
    <div className={`inline-flex items-center justify-center w-fit px-10 py-5 rounded-sm text-caption ${currentBadge.style} ${className}`}>
        {currentBadge.label}
    </div>
    );
}