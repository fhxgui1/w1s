import * as React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  type AlertDialogContentProps,
} from '@/components/animate-ui/components/radix/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Importe o Textarea

interface RadixAlertDialogProps {
  from: AlertDialogContentProps['from'];
  triggerLabel?: string;
  title: string;
  description: string;
  description2:string;
  cancelLabel?: string;
  actionLabel?: string;
  onAction?: (text: string) => void; // Agora recebe o texto do textarea
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialText?: string; // Opcional: valor inicial do textarea
}

export const RadixAlertDialog = ({
  from,
  title,
  description,
  description2,
  cancelLabel = 'Cancel',
  actionLabel = 'Continue',
  onAction,
  open,
  onOpenChange,
  initialText = '',
}: RadixAlertDialogProps) => {
  const [text, setText] = React.useState(initialText);

  
  React.useEffect(() => {
    if (!open) {
      setText(initialText);
    }
  }, [open, initialText]);

  const handleAction = () => {
    onAction?.(text);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent from={from} className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <AlertDialogDescription>{description2}</AlertDialogDescription>
        </AlertDialogHeader>

        {/* Textarea adicionado aqui */}
        <div className="py-4">
          <Textarea
            placeholder="Digite sua mensagem aqui..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};