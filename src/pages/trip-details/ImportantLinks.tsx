import { Link2, Plus } from "lucide-react"
import { Button } from "../../components/Button"

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-zinc-100 block font-medium">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="text-zinc-400 block text-xs truncate text-ellipsis max-w-60 hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/10470001100000000
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>
      <Button size="full" variant="secondary">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}
