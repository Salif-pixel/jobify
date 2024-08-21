import {AreaChart,Layers,AppWindow} from "lucide-react";
type navLink = {
    href: string;
    label: string;
    icon:React.ReactNode;
}

const links:navLink[] = [
    {
        href: "/add-job",
        label: "add job",
        icon:  <Layers  />,

    },
    {
        href: "/jobs",
        label: "Jobs",
        icon: <AppWindow />
    },
    {
        href: "/stats",
        label: "stats",
        icon: <AreaChart />
    },


]
export default links;