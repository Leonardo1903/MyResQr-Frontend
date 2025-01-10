const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
          onClick={onClose}
        >
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
