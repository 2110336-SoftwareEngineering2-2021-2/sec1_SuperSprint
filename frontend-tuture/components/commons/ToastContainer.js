import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const ToastContainer = dynamic(() =>
  import('react-toastify').then((mod) => mod.ToastContainer)
);

const shadowContextClass = {
  success: 'shadow-success/30',
  error: 'shadow-error/30',
  info: 'shadow-info/30',
  warning: 'shadow-warning/30',
  default: 'shadow-primary/30',
};

const progressContextClass = {
  success: 'bg-success',
  error: 'bg-error',
  info: 'bg-info',
  warning: 'bg-warning',
  default: 'bg-primary bg-gradient-to-r from-primary to-primary-focus',
};

export default function Toaster() {
  return (
    <ToastContainer
      toastClassName={({ type }) =>
        'bg-base-100 relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-lg ' +
        shadowContextClass[type || 'default']
      }
      bodyClassName={() =>
        'text-base-content flex flex-row text-sm font-med block p-3'
      }
      progressClassName={({ type }) =>
        'Toastify__progress-bar Toastify__progress-bar--animated ' +
        progressContextClass[type || 'default']
      }
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
