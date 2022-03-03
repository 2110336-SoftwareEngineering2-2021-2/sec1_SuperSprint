import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const ToastContainer = dynamic(() =>
  import('react-toastify').then((mod) => mod.ToastContainer)
);

const contextClass = {
  success: 'bg-success',
  error: 'bg-error',
  info: 'bg-info',
  warning: 'bg-warning',
  default: 'bg-base-100',
};

export default function Toaster() {
  return (
    <ToastContainer
      toastClassName={({ type }) =>
        contextClass[type || 'default'] +
        ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-lg shadow-primary/30'
      }
      bodyClassName={() => 'text-sm text-base-content font-med block p-3'}
      progressClassName="!bg-primary !bg-gradient-to-r !from-primary !to-primary-focus"
      closeButton={({ closeToast }) => (
        <FontAwesomeIcon
          fixedWidth
          icon={faTimes}
          size="xs"
          className="text-base-content"
          onClick={closeToast}
        />
      )}
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
    />
  );
}
