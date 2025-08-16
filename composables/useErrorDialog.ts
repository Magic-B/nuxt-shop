import { Dialog } from "quasar"

interface useErrorDialogProps {
  title: string
  message: string
}

export const useErrorDialog = ({ title, message }: useErrorDialogProps) => {
  Dialog.create({
    title,
    message,
    color: 'red',
  })
}