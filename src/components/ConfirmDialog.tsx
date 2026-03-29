import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-[30%] z-50 mx-auto max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">{title}</h2>
              <p className="text-sm text-muted-foreground mb-6">{description}</p>
              <div className="flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm()
                    onClose()
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
