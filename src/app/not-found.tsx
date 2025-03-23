import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function NotFound() {
    return (
        <div className="flex flex-1 flex-col gap-6 justify-center items-center px-4">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold self-center tracking-tighter text-5xl transition-transform hover:scale-110 cursor-help">404</h1>
                <p>Oops! Wrong turn.</p>
            </div>
            <Button asChild>
                <Link
                    href={`/`}
                    prefetch={false}
                >
                    Back to Home
                </Link>
            </Button>
        </div>
    )
}
