"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  addTodo: (formData: FormData) => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "追加"}
    </Button>
  );
}

export default function AddButton({ addTodo }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useHotkeys("q", () => setIsOpen(true));

  async function handleAction(formData: FormData) {
    try {
      await addTodo(formData);
      toast({
        title: "Success",
        description: "タスクの追加に成功しました",
      });
      setIsOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: e.message,
        });
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full" type="button" size="icon">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="flex flex-col gap-4" action={handleAction}>
          <DialogHeader>
            <DialogTitle>タスクを追加する</DialogTitle>
            <DialogDescription>
              タスクを追加することができます
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label>タイトル</Label>
              <Input type="text" name="title" placeholder="タイトル" />
            </div>
          </div>
          <div className="grid flex-1 gap-2">
            <Label>詳細</Label>
            <Textarea name="body" placeholder="詳細" />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="link">
                キャンセル
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
