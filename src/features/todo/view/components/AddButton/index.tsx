"use client";

import toast from "@/lib/toast";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

type Props = {
  addTodo: (formData: FormData) => void;
};

export default function AddButton({ addTodo }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    setIsOpen(!isOpen);
  }
  async function handleAction(formData: FormData) {
    try {
      await addTodo(formData);
      toast.success("タスクの追加に成功しました");
      setIsOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }
  return (
    <>
      <button
        className="btn btn-circle btn-primary"
        type="button"
        onClick={handleClick}
      >
        <span className="text-2xl">+</span>
      </button>
      <Modal
        isOpen={isOpen}
        overlayClassName="absolute inset-0 bg-opacity-75 bg-white z-50"
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <form className="flex flex-col h-full" action={handleAction}>
          <div className="h-full">
            <h2 className="text-3xl font-bold">タスクを追加する</h2>
            <section className="flex flex-col gap-3 mt-4">
              <div className="flex flex-col">
                <label>タイトル</label>
                <input
                  type="text"
                  name="title"
                  placeholder="タイトル"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex flex-col">
                <label>詳細</label>
                <textarea
                  name="body"
                  className="textarea textarea-bordered"
                  placeholder="Bio"
                />
              </div>
            </section>
          </div>
          <footer className="border-t-2 border-gray pt-4 px-2 mt-auto">
            <div className="flex gap-4">
              <button
                className="btn-link"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                キャンセル
              </button>
              <button className="btn btn-primary" type="submit">
                追加
              </button>
            </div>
          </footer>
        </form>
      </Modal>
    </>
  );
}
