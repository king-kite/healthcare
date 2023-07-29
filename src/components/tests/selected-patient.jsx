import { CloseOutlined } from "@ant-design/icons";

function SelectedPatient({ first_name, last_name, email, image, onClose }) {
  return (
    <div className="bg-gray-200 border border-dashed border-gray-600 flex items-start justify-between p-4 rounded-md">
      <div className="flex items-center">
        {image ? (
          <section className="flex-shrink-0 h-12 w-12">
            <div className="h-12 relative rounded-full w-12">
              <img
                alt={first_name[0]}
                className="h-full w-full rounded-full"
                src={image}
              />
            </div>
          </section>
        ) : (
          <span className="bg-primary-500 h-10 inline-flex items-center justify-center rounded-full text-gray-50 w-10">
            <span className="left-[0.05rem] relative top-[0.075rem]">
              {first_name[0]}
            </span>
          </span>
        )}
        <section className="ml-4 text-left">
          <div className="text-sm font-medium text-gray-700 md:text-base">
            {`${first_name} ${last_name}`}
          </div>
          <div className="normal-case font-normal text-sm text-gray-500">
            {email}
          </div>
        </section>
      </div>
      <span
        className="bg-transparent cursor-pointer duration-300 flex h-10 items-center justify-center rounded-full text-primary-600 text-xl transform transition w-10 hover:bg-gray-200 hover:scale-110"
        onClick={onClose}
      >
        <CloseOutlined />
      </span>
    </div>
  );
}

export default SelectedPatient;
