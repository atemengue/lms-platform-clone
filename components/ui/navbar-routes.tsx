"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import { Button } from '@/components/ui/button';
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isTeacher = pathname?.startsWith("/teacher");
    const isPlayer = pathname?.includes("/chapter");

    return (
        <div className="flex gap-x-2 ml-auto">
            {isTeacher || isPlayer ? (
                <Link href="/">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2" />
                    Exit
/                </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher mode
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    );
}