import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/Button"
import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface CreateActivyModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivyModal({
  closeCreateActivityModal,
}: CreateActivyModalProps) {
  const { tripId } = useParams()

  async function CreateActivy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get("title")?.toString()
    const occurs_at = data.get("occurs_at")?.toString()

    console.log(title, occurs_at)
    console.log(occurs_at)

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    })

    closeCreateActivityModal()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
          <button
            onClick={closeCreateActivityModal}
            className="text-zinc-400 size-5"
          >
            <X />
          </button>
        </div>
        <p className="text-zinc-400 text-sm mt-2 mb-5 text-left">
          Todos convidados podem visualizar as atividades.
        </p>

        <form onSubmit={CreateActivy}>
          <div className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Tag className="size-5 text-zinc-400" />
              <input
                name="title"
                placeholder="Qual a atividade?"
                className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1 "
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input
                  type="datetime-local"
                  name="occurs_at"
                  placeholder=""
                  className="bg-transparent [color-scheme:dark] text-base placeholder-zinc-100 outline-none flex-1 "
                />
              </div>
            </div>
            <Button type="submit" size="full">
              Salvar atividade
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
