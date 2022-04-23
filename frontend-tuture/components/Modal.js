import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  submitBtnText = 'submit',
  onSubmit,
  cancelBtnText = 'cancel',
  onCancel,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-base-content/80"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">{children}</div>

              <div className="mt-4 ml-auto mr-0 flex w-fit gap-2">
                {onCancel && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm w-20 min-w-fit"
                    onClick={onCancel}
                  >
                    {cancelBtnText}
                  </button>
                )}
                {onSubmit && (
                  <button
                    className="btn btn-primary btn-sm w-20 min-w-fit"
                    type="button"
                    onClick={onSubmit}
                  >
                    {submitBtnText}
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
