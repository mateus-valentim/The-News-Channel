import { SidebarTrigger } from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
    colorClass?: string;
    borderColorClass?: string;
}

export function PageHeader({
                               title,
                               description,
                               icon: Icon,
                               colorClass = "text-blue-800",
                               borderColorClass = "border-blue-100"
                           }: PageHeaderProps) {
    return (
        <div className="p-8 pb-0">
            <div className='flex flex-row gap-5'>


                <div className="mb-20 flex items-center">
                    <div className="trigger_container">
                        <SidebarTrigger className="trigger" />
                    </div>
                </div>


                <div className="mb-8">
                    <div className="flex items-center gap-4">


                        <div className={`p-3 border rounded-xl shadow-sm ${borderColorClass}`}>
                            <Icon className={colorClass} />
                        </div>


                        <h1 className={`title ${colorClass}`}>
                            {title}
                        </h1>
                    </div>

                    <p className="mt-3 text-gray-500 max-w-2xl paragraph">
                        {description}
                    </p>
                </div>
            </div>


            <div className="h-[1px] w-full bg-gradient-to-r from-gray-200 via-gray-200 to-transparent mb-8"></div>
        </div>
    );
}