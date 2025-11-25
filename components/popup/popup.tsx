const Popup = ({ open, onClose, data }: any) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center  justify-center z-9999">
      <div className="bg-white fl p-6 rounded-lg shadow-lg w-80">
      <div className="flex justify-end">
          <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          X
        </button>
      </div>
          <div >
        <h2 className="text-xl font-semibold">{data.title}</h2>

        <p className="text-gray-600">{data.description}</p>

        {data.urlToImage && (
          <img
            src={data.urlToImage}
            alt={data.title}
            className="w-full h-48 object-cover rounded-md"
          />
        )}

          <p className="text-gray-600">{data.content}</p>
      </div>
      </div>

    
    </div>
  );
};

export default Popup;
